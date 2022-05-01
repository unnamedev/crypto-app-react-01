import React from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from './app/store'
import Main from './components/Main'
import './index.scss'
// ========================================================
// Render Setup
// ========================================================
createRoot(document.getElementById('root'))
    .render(
        <Provider store={store}>
            <Main/>
        </Provider>
    )
