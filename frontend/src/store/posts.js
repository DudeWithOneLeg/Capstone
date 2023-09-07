import { csrfFetch } from './csrf'
export const flatten = (arr) => {

    const obj = {}
    for (let el of arr) {
        obj[el.id] = el
    }
    return obj
}

const GET_ALL_POSTS = 'getPosts/all'
const GET_SINGLE_POST = 'getPosts/one'
const UPDATE_POST = 'post/update'
const DELETE_POST = 'post/delete'
const GET_FRIEND_POSTS = 'getPosts/friend'
const CREATE_POST = 'create/post'
const CREATE_POST_IMAGE = 'create/postImage'

const setAllPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        payload: posts
    }
}

const setOnePost = (post) => {
    return {
        type: GET_SINGLE_POST,
        payload: post
    }
}

const setUpdatePost = (post) => {
    return {
        type: UPDATE_POST,
        payload: post
    }
}

const setDeletePost = (postId) => {
    return {
        type: DELETE_POST,
        payload: postId
    }
}

const setFriendPosts = (posts) => {
    return {
        type: GET_FRIEND_POSTS,
        payload: posts
    }
}

const setNewPost = (post) => {
    return {
        type: CREATE_POST,
        payload: post
    }
}

const setNewImage = (image) => {
    return {
        type: CREATE_POST_IMAGE,
        payload: image
    }
}

export const uploadImage = (postId, image) => async (dispatch) => {
    const formData = new FormData();
    if (image) formData.append("image", image);
    const res = await csrfFetch(`api/posts/${postId}/images`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    })
    const data = await res.json();
  dispatch(setNewImage(data));
}

export const getAllPosts = () => async (dispatch) => {
    const res = await csrfFetch('/api/feed')
    const data = await res.json()
    if (data && !data.message) dispatch(setAllPosts(flatten(data)))

    return flatten(data)
}

export const getOnePost = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`)
    const data = await res.json()
    if (data && !data.message) dispatch(setOnePost(data))

    return res
}

export const updatePost = (postId, newPost) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(newPost)
    })
    const data = await res.json()
    if (data && !data.message) dispatch(setUpdatePost(data))

    return res
}

export const deletePost = (postId) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    })
    const data = await res.json()
    if (data && data.message) dispatch(setDeletePost(postId))

    return res
}

export const getFriendsPost = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/friends/posts/${userId}`)
    const data = await res.json()
    if (data && !data.message) dispatch(setAllPosts(flatten(data)))

    return res
}

export const createPost = (newPost) => async (dispatch) => {
    const res = await csrfFetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(newPost)
    })
    const data = await res.json()
    if (data && !data.message) dispatch(setNewPost(data))
    return data
}

const initialState = {}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POSTS:
            return { ...state, allPosts: { ...action.payload } }
        case GET_SINGLE_POST:
            return { ...state, singlePost: { ...action.payload } }
        case UPDATE_POST:
            const postId = action.payload.id
            const updatedState = { ...state }
            const updaedPosts = { ...updatedState.allPosts }
            updaedPosts[postId] = { ...action.payload }
            return { ...updatedState, allPosts: { ...updaedPosts } }
        case DELETE_POST:
            const deleteId = action.payload
            const currentState = { ...state }
            const currentPosts = { ...currentState.allPosts }
            delete currentPosts[deleteId]
            return { ...state, allPosts: { ...currentPosts } }
        case GET_FRIEND_POSTS:
            return { ...state, friendPosts: { ...action.payload } }
        case CREATE_POST:
            const id = action.payload.id
            const newState = { ...state }
            const newPosts = { ...newState.allPosts }
            newPosts[id] = { ...action.payload }
            console.log('post payload',action.payload)
            return { ...newState, allPosts: { ...newPosts } }
        case CREATE_POST_IMAGE:
            const imgPostId = action.payload.postId
            console.log(action.payload)
            console.log('image postid',imgPostId)
            const imageState = {...state}
            const imagePosts = {...imageState.allPosts}
            const imgPost = imagePosts[imgPostId]
            imagePosts[imgPostId] = {...imgPost, url: action.payload.url, data: action.payload.data}

            return {...imageState, allPosts: {...imagePosts}}
        default:
            return state
    }
}
