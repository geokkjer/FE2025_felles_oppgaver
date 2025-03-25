import clickerView from './view/clicker.js'
import scoreView from './view/counter.js'
import appView from './view/app.js'
import applyDiff from './applyDiff.js'


import registry from './registry.js'

import stateFactory from './model/state.js'

registry.add('app', appView)
registry.add('clicker', clickerView)
registry.add('score', scoreView)

const loadState = () => {
    const serializedState = window
        .localStorage
        .getItem('state')
    
        if (!serializedState){
            return
        }

        return JSON.parse(serializedState)
}

const state = stateFactory(loadState())