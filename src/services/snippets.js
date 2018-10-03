import lsIpfsService from './LsIpfsService'

export function fetch() {
    return lsIpfsService.fetch();
}

export function destroy(id) {
    return lsIpfsService.delete(id)
}

export function create(payload) {
    return lsIpfsService.create(payload)
}

export function update(payload) {
    return lsIpfsService.update(payload)
}
