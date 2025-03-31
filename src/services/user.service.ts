
import { httpService } from './http.service.js'
import { LoginCredentials, User, signUpCredentials } from '../types/user.types.js'
import { FilterBy, SortBy } from '../types/filter-sort.js'
import { Job } from '../types/job.types.js'
const BASE_URL: string = 'auth/'
const STORAGE_KEY_LOGGEDIN: string = 'loggedInUser'
export const userService = {
    login,
    logout,
    signup,
    getLoggedInUser,
    getUsers,
    getJobsByUserId,
    addJob,
    deleteJob,
    updateJob,
    demoLogin,
    addJobToFavorite,
    removeJobFromFavorite
}


function getUsers() {
    return httpService.get(`user`)
}

async function getJobsByUserId(userId: string, filterBy: FilterBy, sortBy: SortBy) {
    const user = await httpService.get(`user/${userId}`, { params: { filterBy, sortBy } })
    return user
}

async function login({ userName, password, recaptchaToken }: LoginCredentials): Promise<User | null> {
    const user = await httpService.post(BASE_URL + 'login', { userName, password, recaptchaToken })
    if (!user) {
        throw new Error('Login failed: Invalid credentials or reCAPTCHA verification failed.')
    }
    return _setLoggedInUser(user)
}

async function demoLogin({ userName, password, recaptchaToken }: LoginCredentials): Promise<User | null> {
    const demoUser = await httpService.post(BASE_URL + 'demoLogin', { userName, password, recaptchaToken })
    if (!demoUser) {
        throw new Error('Login failed: Invalid credentials or reCAPTCHA verification failed.')
    }
    return _setLoggedInUser(demoUser)
}


async function signup({ userName, password, fullName }: signUpCredentials): Promise<User> {
    const user = { userName, password, fullName, jobs: [], favoriteJobs: [] }
    const savedUser = await httpService.post(BASE_URL + 'signup', user)
    if (!savedUser) {
        throw new Error('signup failed: Invalid credentials or reCAPTCHA verification failed.')
    }
    return _setLoggedInUser(savedUser)
}

async function logout(): Promise<void> {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function _setLoggedInUser(user: User): User {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

async function addJob(userToUpdate: User, newJob: Job, recaptchaToken: string): Promise<User> {
    const { _id, fullName, userName } = userToUpdate
    const user = await httpService.put(`user/${_id}/addJob`, { _id, fullName, userName, newJob, recaptchaToken })
    const loggedInUser = getLoggedInUser()
    if (loggedInUser && loggedInUser._id === user._id) saveLocalUser(user)
    return user
}
async function addJobToFavorite(userToUpdate: User, newJob: Job,): Promise<User> {
    const { _id, fullName, userName } = userToUpdate
    const user = await httpService.put(`user/${_id}/addJobToFavorite`, { _id, fullName, userName, newJob })
    const loggedInUser = getLoggedInUser()
    if (loggedInUser && loggedInUser._id === user._id) saveLocalUser(user)
    return user
}


async function deleteJob(userToUpdate: User, jobId: string): Promise<User> {
    const { _id, fullName, userName } = userToUpdate
    const user = await httpService.put(`user/${_id}/deleteJob`, { _id, fullName, userName, jobId })
    const loggedInUser = getLoggedInUser()
    if (loggedInUser && loggedInUser._id === user._id) saveLocalUser(user)
    return user
}
async function removeJobFromFavorite(userToUpdate: User, jobId: string): Promise<User> {
    const { _id, fullName, userName } = userToUpdate
    const user = await httpService.put(`user/${_id}/removeJobFromFavorite`, { _id, fullName, userName, jobId })
    const loggedInUser = getLoggedInUser()
    if (loggedInUser && loggedInUser._id === user._id) saveLocalUser(user)
    return user
}

async function updateJob(userToUpdate: User, jobId: string): Promise<User> {
    const { _id, fullName, userName, jobs } = userToUpdate
    const user = await httpService.put(`user/${_id}/updateJob`, { _id, fullName, userName, jobs, jobId })
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
    user = { _id: user._id, fullName: user.fullName, userName: user.userName, jobs: user.jobs, totalFilteredJobs: user.totalFilteredJobs, allJobs: user.allJobs, favoriteJobs: user.favoriteJobs }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}






