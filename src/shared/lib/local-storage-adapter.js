/**
 * A utility module for interacting with the browser's localStorage.
 */
export default {
    /**
     * Retrieves an item from localStorage.
     * @param {string} key - The key of the item to retrieve.
     * @returns {Object} The parsed JSON object from localStorage, or an empty object if the item does not exist.
     */
    getItem(key) {
        return localStorage.getItem(key) != null ? JSON.parse(localStorage.getItem(key)) : {}
    },

    /**
     * Stores an item in localStorage.
     * @param {string} key - The key under which the item should be stored.
     * @param {Object} collection - The item which should be stored.
     */
    setItem(key, collection) {
        localStorage.setItem(key, JSON.stringify(collection))
    },

    /**
     * Removes an item from localStorage.
     * @param {string} key - The key of the item to remove.
     */
    removeItem(key) {
        localStorage.removeItem(key);
    }
}