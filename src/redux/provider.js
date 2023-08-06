const { Provider } = require('react-redux')
const { store } = require('./store')

export function ReduxProvider({ children }) {
  return <Provider store={store}> {children}</Provider>
}
