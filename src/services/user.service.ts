
import { httpService } from './http.service.js'
import { LoginCredentials, User, signUpCredentials } from '../types/user.types.js'
import { FilterBy } from '../types/filter-sort.js'
const BASE_URL: string = 'auth/'
const STORAGE_KEY_LOGGEDIN: string = 'loggedInUser'
export const userService = {
    login,
    logout,
    signup,
    getLoggedInUser,
    getUsers,
    getById,
    update
}


function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId: string, filterBy: FilterBy) {
    const user = await httpService.get(`user/${userId}`, { params: { filterBy } })
    return user
}

async function login({ userName, password }: LoginCredentials): Promise<any> {
    const user = await httpService.post(BASE_URL + 'login', { userName, password })
    if (user) return _setLoggedInUser(user)
}

async function signup({ userName, password, fullName }: signUpCredentials): Promise<any> {
    const user = { userName, password, fullName, jobs: [] }
    const savedUser = await httpService.post(BASE_URL + 'signup', user)
    if (savedUser) return _setLoggedInUser(savedUser)
}

async function logout(): Promise<any> {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function _setLoggedInUser(user: any) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}


async function update(userToUpdate: User) {
    const { _id, jobs, fullName, userName } = userToUpdate
    const user = await httpService.put(`user/${_id}`, { _id, jobs, fullName, userName })
    const loggedInUser = getLoggedInUser()
    if (loggedInUser && loggedInUser._id === user._id) saveLocalUser(user)
    return user
}

function getLoggedInUser(): User | null {
    const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN)
    if (user) {
        return JSON.parse(user) as User
    }
    return null
}

function saveLocalUser(user: User) {
    user = { _id: user._id, fullName: user.fullName, userName: user.userName, jobs: user.jobs }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}






