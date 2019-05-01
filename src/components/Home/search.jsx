import React, { Component } from 'react';
import Video from './../../assets/images/video.png';


class search extends Component {
  

    render() {
        return (
            <div>
                <img src={Video} alt="video" className="pb-4" height="100px" />
                <div className="w-75 mx-auto pb-3">
                    <h5>Hey there, welcome to SceneMax! I am your new and improved movie search portal.</h5>
                    <h5>What Can I Do? Glad you asked :).</h5>
                    <h5>I can help you fetch any movie you like and details. As a bonus, you can review the movie and add it to your rated movies list</h5>
                </div>
            </div>

        );
    }
}

export default search;