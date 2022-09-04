quick_draw_data_set = ["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant","envelope","eraser","eye","eyeglasses","face","fan","feather","fence","finger","fire hydrant","fireplace","firetruck","fish","flamingo","flashlight","flip flops","floor lamp","flower","flying saucer","foot","fork","frog","frying pan","garden","garden hose","giraffe","goatee","golf club","grapes","grass","guitar","hamburger","hammer","hand","harp","hat","headphones","hedgehog","helicopter","helmet","hexagon","hockey puck","hockey stick","horse","hospital","hot air balloon","hot dog","hot tub","hourglass","house","house plant","hurricane","ice cream","jacket","jail","kangaroo","key","keyboard","knee","knife","ladder","lantern","laptop","leaf","leg","light bulb","lighter","lighthouse","lightning","line","lion","lipstick","lobster","lollipop","mailbox","map","marker","matches","megaphone","mermaid","microphone","microwave","monkey","moon","mosquito","motorbike","mountain","mouse","moustache","mouth","mug","mushroom","nail","necklace","nose","ocean","octagon","octopus","onion","oven","owl","paintbrush","paint can","palm tree","panda","pants","paper clip","parachute","parrot","passport","peanut","pear","peas","pencil","penguin","piano","pickup truck","picture frame","pig","pillow","pineapple","pizza","pliers","police car","pond","pool","popsicle","postcard","potato","power outlet","purse","rabbit","raccoon","radio","rain","rainbow","rake","remote control","rhinoceros","rifle","river","roller coaster","rollerskates","sailboat","sandwich","saw","saxophone","school bus","scissors","scorpion","screwdriver","sea turtle","see saw","shark","sheep","shoe","shorts","shovel","sink","skateboard","skull","skyscraper","sleeping bag","smiley face","snail","snake","snorkel","snowflake","snowman","soccer ball","sock","speedboat","spider","spoon","spreadsheet","square","squiggle","squirrel","stairs","star","steak","stereo","stethoscope","stitches","stop sign","stove","strawberry","streetlight","string bean","submarine","suitcase","sun","swan","sweater","swingset","sword","syringe","table","teapot","teddy-bear","telephone","television","tennis racquet","tent","The Eiffel Tower","The Great Wall of China","The Mona Lisa","tiger","toaster","toe","toilet","tooth","toothbrush","toothpaste","tornado","tractor","traffic light","train","tree","triangle","trombone","truck","trumpet","tshirt","umbrella","underwear","van","vase","violin","washing machine","watermelon","waterslide","whale","wheel","windmill","wine bottle","wine glass","wristwatch","yoga","zebra","zigzag"]

random_no = Math.floor((Math.random()*quick_draw_data_set.length)+1)

console.log(random_no)

Element_of_array = quick_draw_data_set[random_no]

document.getElementById('sketch_assigned').innerHTML="Sketch to be drawn : " + Element_of_array

timer_counter = 0
timer_check = ""
drawn_sketch = ""
answer_holder = ""
score = 0

function preload(){
    classifier=ml5.imageClassifier('Doodlenet');
}

function setup(){
    canvas=createCanvas(280,280);
    canvas.center();
    background('white');
    canvas.mouseReleased(classifyCanvas)
    synth = window.speechSynthesis
}
function clearCanvas(){
    background('white');
}

function draw(){
    check_sketch()
    strokeWeight(5);
    stroke(0);
    if (mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}

function check_sketch(){
    if(timer_counter<400){
        timer_counter++
        document.getElementById('timer').innerHTML = "Timer : "+ timer_counter
    }
    else if (timer_counter<400)
    {
        timer_counter = 0
        timer_check = 'completed'
    }
    if(timer_check=='completed'){
        timer_check = 0
        answer_holder = ""
        updateCanvas()
    }
    if(timer_counter==400){
        document.getElementById('timer').innerHTML = "Time's up!"
    }
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('sketch_guessed').innerHTML="Your Sketch : " + results[0].label
    document.getElementById('confidence').innerHTML="Confidence : " + Math.round(results[0].confidence*100) + '%'
    UtterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(UtterThis);
    if(results[0].label == Element_of_array){
        document.getElementById('score').innerHTML = "Score : " + 1
    }
}