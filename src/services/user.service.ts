
import { httpService } from './http.service.js'
import { LoginCredentials, signUpCredentials } from '../types/user.types.js'
const BASE_URL: string = 'auth/'
const STORAGE_KEY_LOGGEDIN: string = 'loggedInUser'
export const userService = {
    login,
    logout,
    signup,
    getloggedInUser,
    getUsers,
    getById,
    update
}


function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId: string) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

async function login({ userName, password }: LoginCredentials): Promise<any> {
    const user = await httpService.post(BASE_URL + 'login', { userName, password })
    if (user) return _setLoggedInUser(user)
}

async function signup({ userName, password, fullName }: signUpCredentials): Promise<any> {
    const user = { userName, password, fullName, jobs: [] }
    // console.log(user)
    const savedUser = httpService.post(BASE_URL + 'signup', user)
    // console.log(savedUser)
    if (savedUser) return _setLoggedInUser(savedUser)
}

async function logout() {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function _setLoggedInUser(user: Promise<any>) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}


async function update(userToUpdate) {
    const { _id, jobs, fullName } = userToUpdate
    const user = await httpService.put(`user/${_id}`, { _id, jobs, fullName })
    if (getloggedInUser()._id === user._id) saveLocalUser(user)
    return user
}

function getloggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}






