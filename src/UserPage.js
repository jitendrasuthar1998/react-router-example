import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserPage(props)
{
  //setting initial state
  const initialUserState = {
    user: {},
    loading: true,
  }

  //getter and setter for user state

  const [user, setUser] = useState(initialUserState);

  //using useEffect to retrieve data from an api

  useEffect(() =>
  {
    const getUser = async () =>
    {
      //pass our param (:id) to the api call

      const { data } = await axios(
        `https://api.github.com/users/${props.match.params.id}`
      )

      //update state
      setUser(data)
    }

    //Invoke the async function

    getUser()
  }, [props.match.params.id])

  //don't forget the '[]', which will prevent useEffect from running in an infinite loop

  //return a table with some data from the api

  return user.loading ? (
    <div>Loading..</div>
  )
    :
    (
      <div className="container">
        <h1>{props.match.params.id}</h1>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Website</th>
              <th>Followers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.name}</td>
              <td>{user.location}</td>
              <td>
                <a href={user.blog}>{user.blog}</a>
              </td>
              <td>{user.followers}</td>
            </tr>
          </tbody>
        </table>


      </div>
    )



}