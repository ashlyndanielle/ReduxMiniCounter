
const initialState = {
  currentValue: 0,
  previousValues: [],
  futureValues: []
}

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const UNDO = 'UNDO';
const REDO = 'REDO';

// ------------- REDUCER ------------- //

export default function counter(state=initialState, action) {
  switch(action.type) {
    case INCREMENT:
      return {
        currentValue: state.currentValue + action.amount,
        futureValues: [],
        previousValues: [ state.currentValue, ...state.previousValues]
      }

    case DECREMENT:
      return {
        currentValue: state.currentValue - action.amount,
        futureValues: [],
        previousValues: [ state.currentValue, ...state.previousValues ]
      }

      case UNDO:
        if (state.previousValues.length > 0) {
          return {
            currentValue: state.previousValues[0],
            futureValues: [ state.currentValue, ...state.futureValues ],
            previousValues: state.previousValues.slice(1, state.previousValues.length)
          }
        }
        return state

      case REDO:
        if (state.futureValues.length > 0) {
          return {
            currentValue: state.futureValues[0],
            futureValues: state.futureValues.slice(1, state.futureValues.length),
            previousValues: [ state.currentValue, ...state.previousValues ]
          }
        }
        return state
    default:
      return state
  }
}

// ------------- ACTION CREATORS ------------- //

export function increment(amount) {
  return {
    type: INCREMENT,
    amount
  }
}

export function decrement(amount) {
  return {
    type: DECREMENT,
    amount
  }
}

export function undo() {
  return {
    type: UNDO
  }
}

export function redo() {
  return {
    type: REDO
  }
}