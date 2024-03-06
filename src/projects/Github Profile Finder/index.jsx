import { useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";

function GithubProfileFinder() {
  const [username, setUsername] = useState("fridah");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [profile, setProfile] = useState({});

  const fetchUser = async () => {
    setLoading(true);
    const url = `https://api.github.com/users/${username}`;
    try {
      const response = await axios.get(url);
      if (response.data) {
        setProfile(response.data);
        setUsername("");
        setLoading(false);
      }
    } catch (error) {
      setErrMsg(error.message);
      console.log(error);
    }
  };

  const handleSubmit = () => {
    fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <section className="wrapper">
        <p>Data loading. Please wait ...</p>
      </section>
    );
  }

  if (errMsg) {
    return (
      <section className="wrapper">
        <p>{errMsg}</p>
      </section>
    );
  }

  console.log(Object.keys(profile).length);
  console.log(profile);

  return (
    <section className="wrapper">
      <section className="content">
        <section className="input">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Search Github Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleSubmit}>Search</button>
        </section>

        <section className="profile">
          {Object.keys(profile).length > 0 ? (
            <>
              <img src={profile.avatar_url} alt={profile.login} />
              <h4>{profile.login}</h4>
              <h6>Followers: {profile.followers}</h6>
              <h6>Followig: {profile.following}</h6>
              <a target="__blank" href={`https://github.com/${profile.login}`}>
                visit profile
              </a>
            </>
          ) : null}
        </section>
      </section>
    </section>
  );
}

export default GithubProfileFinder;
