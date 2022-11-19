song1="";
song2="";

song1_status="";
song2_status="";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
    song1 = loadSound('music.mp3');
    song2 = loadSound('music.mp3');
}



function setup()
{
    canvas=createCanvas(660, 560);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, model_loaded);
    poseNet.on('pose', gotposes);

}
function model_loaded()
{
    console.log('Posenet is Initialised');
}

function gotposes(results)
{
    if(results.length > 0)
    {
        console.log(results);
        score_leftWrist=results[0].pose.keypoints[9].score;
        console.log("score_leftwrist =" + score_leftWrist);

        score_rightWrist=results[0].pose.keypoints[10].score;
        console.log("score_rightwrist =" + score_rightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightwristx="+rightWristX + 'rightwristy=' + rightWristX);
        console.log("leftwristx="+leftWristX + 'leftwristy=' + leftWristY);

    }
}


function draw()
{
    image(video,0,0,660,560);
     song1_status = song1.isPlaying();
     song2_status = song2.isPlaying();


    fill( "#00008B");
    stroke("white");
   
     if(score_rightWrist > 0.2)
     {
        
        circle(rightWristX,rightWristY,20)
        song2.stop();
       
     if(song1_status == false) 
       {
        song1.play();
        document.getElementById("song").innerHTML= "Masked_Wolf_Astronaut_In_The_Ocean.mp3";
       }

    }

    if(score_lefttWrist > 0.2)
    {
       
       circle(leftWristX,leftWristY,20)
       song1.stop();
      
    if(song2_status == false) 
      {
       song2.play();
       document.getElementById("song").innerHTML= "Boyce_Avenue_See_You_Again.mp3";
      }

   }
    

    if(score_leftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        Innumber_leftWristY=Number(leftWristY);
        remove_decimal=floor( Innumber_leftWristY );
        song_volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="Volume = " + song_volume;
        song.setVolume(volume);
    }
    
}


function play()
{
    song.play();
    //song.setVolume(song_volume);
    song.rate(1);

}