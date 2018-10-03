import IpfsApi from 'ipfs-api'

const Buffer = require('buffer/').Buffer;

class LsIpfsService {

    lsName = 'ipfs-editor';

    constructor() {
        this.ls = window.localStorage;
        this.ipfs = IpfsApi('ipfs.infura.io', '5001', {protocol: 'https'})
    }

    get snippets() {
        let snippets = [];
        try {
            snippets = JSON.parse(window.localStorage[this.lsName]);
            if (!Array.isArray(snippets)) {
                throw new Error("snippets are not array");
            }
        } catch (e) {
            this.snippets = [];
        }
        return snippets;
    }

    set snippets(data) {
        window.localStorage[this.lsName] = JSON.stringify(data);
    }

    async getFromIpfs(hash) {
        const files = await this.ipfs.files.get(hash);
        return files[0].content.toString('utf8');
    }

    async saveToIpfs(data) {
        let buffer = new Buffer(data);
        const resp = await this.ipfs.files.add(buffer);
        return resp[0].hash;
    }

    async fetch() {
        return await Promise.all(this.snippets.map(async snippet => ({
            ...snippet,
            body: await this.getFromIpfs(snippet.id)
        })));
    }

    async create(payload) {
        let hash;
        try {
            hash = await this.saveToIpfs(payload.body)
        } catch (e) {
            return null;
        }
        const newSnippet = {
            id: hash,
            title: payload.title,
            updatedAt: Date.now()
        };

        this.snippets = [
            ...this.snippets,
            newSnippet
        ];
        return Promise.resolve({
            ...newSnippet,
            body: payload.body
        });
    }

    async update(payload) {
        const hash = await this.saveToIpfs(payload.body);
        const snippets = this.snippets;
        snippets
            .filter(({title}) => title === payload.title)
            .forEach(p => {
                p.id = hash;
                p.body = payload.body;
                p.updatedAt = Date.now();
            });
        this.snippets = snippets;
        return {
            ...payload,
            id: hash
        };
    }

    async delete(snippetId) {
        if(!this.snippets.find(({id}) => id !== snippetId)) {
            return false;
        }
        this.snippets = this.snippets.filter(({id}) => id !== snippetId);
        return true;
    }
}

export default new LsIpfsService()
