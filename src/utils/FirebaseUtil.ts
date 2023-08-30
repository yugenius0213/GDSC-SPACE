import { FirebaseApp, initializeApp } from '@firebase/app'
import { doc, Firestore, getDoc, getFirestore } from '@firebase/firestore'
import { MainTimeline } from '~/interfaces/FirebaseAPI'
import { API_MAIN_PROJECTS, API_MAIN_TIMELINES } from '~/src/interfaces'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID,
}

let firebaseApp: FirebaseApp
let firebaseDB: Firestore

const initFirebase = () => {
    firebaseApp = initializeApp(firebaseConfig)
    firebaseDB = getFirestore()
}

export const getMainProjectDB = async () => {
    if (firebaseApp === undefined || firebaseDB === undefined) {
        initFirebase()
    }

    const ProjectList: API_MAIN_PROJECTS = {
        MAIN_PROJECT_CNT: 0,
        MAIN_PROJECT_LIST: [],
    }

    return ProjectList
}

export const getMainTimelineDB = async () => {
    if (firebaseApp === undefined || firebaseDB === undefined) {
        initFirebase()
    }

    const TimelineList: API_MAIN_TIMELINES = {
        MAIN_TIMELINE_CNT: 0,
        MAIN_TIMELINE_LIST: [],
    }

    const timelineDocData = await getDoc(doc(firebaseDB, 'Main', 'Timelines'))
    if (!timelineDocData.exists()) {
        return TimelineList
    }

    timelineDocData.data().list.forEach((projItem: MainTimeline) => {
        TimelineList.MAIN_TIMELINE_CNT++
        TimelineList.MAIN_TIMELINE_LIST.push({
            TIMELINE_CARD_TITLE: projItem.Card_title,
            TIMELINE_DATE: projItem.Date,
            TIMELINE_DESCRIPTION: projItem.Description,
            TIMELINE_TITLE: projItem.Title,
        })
    })

    return TimelineList
}
