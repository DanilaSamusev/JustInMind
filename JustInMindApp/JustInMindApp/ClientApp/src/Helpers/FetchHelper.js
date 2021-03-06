﻿export default class FetchHelper {

    static requestOptions = (method, token, body) => {
        let options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            }
        }

        if (body != null) {
            options.body = body;
        }

        return options
    }

    static async fetchGet(url, token) {
        return await fetch(url, FetchHelper.requestOptions('GET', token))
    }

    static async fetchPut(url, token, body) {
        return await fetch(url, FetchHelper.requestOptions('PUT', token, body))
    }

    static async fetchPost(url, token, body) {
        return await fetch(url, FetchHelper.requestOptions('POST', token, body))
    }

    static async fetchDelete(url, token) {
        return await fetch(url, FetchHelper.requestOptions('DELETE', token))
    }

    static async fetchDelete(url, token, body) {
        return await fetch(url, FetchHelper.requestOptions('DELETE', token, body))
    }
}