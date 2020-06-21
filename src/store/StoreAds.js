/**
 * Необходимое,для данной  работы с FireBase;
 */
import firebase from 'firebase/app';
import "firebase/database";
import "firebase/storage";
/**
 * Ad - класс,для идентичности работы с state;
 */
import {Ad} from "../API/APIFirebase";

/**
 * Самый главный воин,который крепко дружит с putInStorage,для последующего добавления ссылок на файлы в DB;
 * @type Array
 */
let url_image = [];

/**
 *
 * Firebase не может в одинаковое именование файлов.Если вставлять картинку не с уникальным именованием,то будет боль;
 * Поэтому и используется уникальность в виде миллисекунд и случайного значения;
 * getDownloadURL возвращает готовую ссылку на сам файл,который был положен в Storage;
 * @param upload_image
 * @param key
 * @param commit
 * @returns {Promise<void>}
 */
async function putInStorage(upload_image, key, commit) {
    try {
        commit('setLoading', true);
        const imageExt = upload_image.name.slice(upload_image.name.lastIndexOf('.'));

        await Promise.resolve(
            firebase.storage().ref().child(`ads/${key}${new Date().getMilliseconds()}${Math.floor(Math.random() * 100)}${imageExt}`)
                .put(upload_image)).then(file =>
            Promise.resolve(
                file.ref.getDownloadURL().then(url => url_image.push(url))));
    } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error
    }
}

/**
 * full_current_images_url фильтруется от подготовленных к удалению ссылок на файлы (full_old_image_url);
 * Удаление из Storage (refFromURL) происходит по ссылке самого файла (image_href);
 *
 * @param full_current_images_url
 * @param DB
 * @param commit
 * @returns images_url
 */
async function filterImageAndDeleteInStorage(full_current_images_url,DB, commit) {
    try {
        const initial_full_old_image_url = await DB.child('src').once('value');
        const full_old_image_url = await initial_full_old_image_url.val();
        const remove_old_images = full_old_image_url.filter(image => !full_current_images_url.includes(image));
        remove_old_images.forEach(image => {
            const image_href = new URL(image).href;
            const storage_images = firebase.storage().refFromURL(image_href);
            storage_images.delete();
        });
    } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error
    }
}

export default {
    actions: {
        /**
         * Когда data запушила новые данные (new_data_ad) можно получить ключ к непосредственно самой записи;
         * Далее новые файлы  отправляются в (putInStorage) и сам ключ;
         * После добавления новых файлов в Storage происходит обновление в DB на добавления ссылок на сами файлы;
         * @param commit
         * @param getters
         * @param payload
         * @returns undefined
         */
        async createdAd({commit, getters}, payload) {
            url_image = [];
            const new_data_ad = new Ad(
                payload.title,
                payload.description,
                getters.user.id,
                payload.promo);
            try {
                commit('clearError');
                commit('setLoading', true);
                const data = await firebase.database().ref('ads').push({...new_data_ad});
                const key_push = data.key;
                await Promise.all(payload.image.map(image => putInStorage(image, key_push, commit)));
                await data.update({src: [...url_image]});
                commit('pushNewAds', {...new_data_ad, id: key_push, src: url_image});
                await data.update({id: key_push});
                commit('setLoading', false);
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error
            }
        },
        /**
         *  Получение текущей записи (data);
         *  В случае, когда имеются новые файлы (payload.images.length) - отправляются в putInStorage;
         *  Проверка на  претендентов на удаления (payload.remove_image.length) - отправляются в
         *  filterImageAndDeleteInStorage;
         * @param commit
         * @param payload
         *  @returns undefined
         */
        async updateAd({commit}, payload) {
            url_image = [];
            let results_image_upload;

            try {
                commit('clearError');
                commit('setLoading', true);
                const data = await firebase.database().ref('ads').child(payload.id);
                if (payload.images.length) {
                    await Promise.all(payload.images.map(image => putInStorage(image, payload.id, commit)));
                }
                const current_image =  payload.src.filter(image => !image.includes("data:image/"));
                await filterImageAndDeleteInStorage(current_image,data, commit);
                results_image_upload = new Set([current_image.concat(url_image)]);
                const update_data_ad = new Ad(
                    payload.title,
                    payload.description,
                    payload.ownerId,
                    payload.promo,
                    payload.id,
                    ...results_image_upload,);
               await data.update(update_data_ad);
                commit('updateAd', update_data_ad);
                commit('setLoading', false);
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error.message);
                throw error
            }
        }
    },
};