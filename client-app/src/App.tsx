import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './layout/Header';
import Home from './features/home/Home';
import { Route, Switch } from 'react-router-dom';
import ChatPage from './features/chats/ChatPage';
import CreateChatForm from './common/forms/CreateChatForm';
import LoginPage from './features/users/LoginPage';
import RegisterPage from './features/users/RegisterPage';
import PrivateRoute from './layout/PrivateRoute';
import { useStore } from './stores/store';
import { observer } from 'mobx-react-lite';
import ProfilePage from './features/profiles/ProfilePage';
import JoinChatForm from './common/forms/JoinChatForm';

function App() {

  const {commonStore, userStore} = useStore();

  useEffect(() => {
      if (commonStore.token) {
          userStore.getUser().finally(() => console.log("Юзер успешно загружен", userStore.isLoggedIn));
      } 
  }, [commonStore, userStore])


  return (
    <>
    {userStore.isLoggedIn && <Header />}
      

      <Switch>
        <PrivateRoute exact path='/' component={Home} />

        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />

        <PrivateRoute exact path='/chats/:id' component={ChatPage} />
        <PrivateRoute exact path='/createChat' component={CreateChatForm} />
        <PrivateRoute exact path='/joinChat' component={JoinChatForm} />

        <PrivateRoute exact path='/profile/:username' component={ProfilePage} />
      </Switch>

    </>

  );
}

export default observer(App);
