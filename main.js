song ="";
 

scorerightWrist=0;
scorelefttWrist=0;

rightWristX=0;
rightWristY=0;

leftWristX = 0;
leftWristY = 0;
function preload()
{
    song = loadSound("song.mp3");
}

function setup() {

    canvas= createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('poise', gotPoses);

} 

function modelLoaded(){
    console.log('Posent is Intialized');

}

function gotPoses(results)
{
    if(results.length > 0)
    {
        
        
    
    console.log(results);
    scorerightWrist = results[0].posekeypoints[10].score;
    scorelefttWrist = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX =" + rightWristX+"rightwristY ="+rightWristY);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX =" + leftWristX+"leftwristY ="+leftWristY);

    }
}
function draw() {

    Image(video, 0, 0, 600, 500);

    fill("#800080");
    stroke("#800080")

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY,20);

        if(rightWristY>0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY> 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }

        else if(rightWristY> 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        else if(rightWristY> 300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(2);
        }
        else if(rightWristY> 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }

        
    }
if(scorelefttWrist > 0.2)
{
    circle(leftwristX,leftWristY,20);
    InNumberleftWrsitY = Number (leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    leftWristY_divide_1000 = remove_decinals/1000;
    volume = rempve_decimal/500;
    document.getElementById("volume").innerHTML = "Volume =" + volume;
    song.setVolume(volume);

}
}

function play()
{
    song.play();
    sound.setVolume(1);
    song.rate(1);
}