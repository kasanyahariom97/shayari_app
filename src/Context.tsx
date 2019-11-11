import React, { Component } from 'react'

const AppContext = React.createContext({});

export default class AppProvider extends Component {

   state = {
      currentPage: 0,
      currentShayari: 0,
   }

   actions = {
      setCurrentPage: (num: number) => {
         this.setState(state => ({
            ...state,
            currentPage: num
         }))
      },
      setCurrentShayari: (num: number) => {
         this.setState(state => ({
            ...state,
            currentShayari: num
         }))
      }
   }

   render() {
      return (
         <AppContext.Provider value={{...this.state, ...this.actions}}>
            {this.props.children}
         </AppContext.Provider>
      )
   }
}

const AppConsumer = AppContext.Consumer;

export { AppContext, AppConsumer }