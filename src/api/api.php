<?php
require_once("rest.inc.php");
//header('Access-Control-Allow-Origin: *');  
header("HTTP/1.1 200 OK");
//header('Access-Control-Allow-Methods: GET,PUT,POST'); 

class API extends REST {
     
    public $data = "";

    // Dev database
    /*
	const DB_SERVER = "localhost";
	const DB_USER = "lynconne_api";
    const DB_PASSWORD = "WeLgbOAHU?Jl";
    const DB = "lynconne_local";       
    */

	private $db = NULL;
	public function __construct(){
        parent::__construct();              // Init parent contructor
	}

	private function dbConnect(){
	}
	
	private function executeArrayStatement($statement) {
		$mysqli = new mysqli(self::DB_SERVER,self::DB_USER,self::DB_PASSWORD,self::DB);
		
        /* check connection */
        if (mysqli_connect_errno()) {
            printf("Connect failed: %s\n", mysqli_connect_error());
            exit();
        }


        $myArray = array();
        if ($result = $mysqli->query($statement)) {

            while($row = $result->fetch_array(MYSQLI_ASSOC)) {
                $myArray[] = $row;
            }
            echo json_encode($myArray);
        }

        $result->close();
        $mysqli->close();
	}		
	
	private function executeInsertStatement($statement) {
		$mysqli = new mysqli(self::DB_SERVER,self::DB_USER,self::DB_PASSWORD,self::DB);
		
        /* check connection */
        if (mysqli_connect_errno()) {
            printf("Connect failed: %s\n", mysqli_connect_error());
            exit();
        }

		$mysqli->query($statement);
		
		$mysqli_result = array('lastID' => $mysqli->insert_id);

 		$this->response(json_encode($mysqli_result),200);
	}			
	
    private function executeSimpleStatement($statement) {
        $mysqli = new mysqli(self::DB_SERVER,self::DB_USER,self::DB_PASSWORD,self::DB);
		
        /* check connection */
        if (mysqli_connect_errno()) {
            printf("Connect failed: %s\n", mysqli_connect_error());
            exit();
        }

        $mysqli_result = $mysqli->query($statement);
        if($mysqli_result->num_rows > 0) {
                $result = array();
                $result = $mysqli_result->fetch_array();
                $this->response(json_encode($result),200);
        } elseif ($mysqli_result->num_rows == 0) {
            $this->response(null,200);
        }
        $this->response('',400);        
    }	
    
    private function addLogEntry($statement, $status, $executedBy, $notes) {
        $mysqliLog = new mysqli(self::DB_SERVER,self::DB_USER,self::DB_PASSWORD,self::DB);

        $statement = $mysqliLog->real_escape_string($statement);
        $status = $mysqliLog->real_escape_string($status);
        $executedBy = $mysqliLog->real_escape_string($executedBy);
        $notes = $mysqliLog->real_escape_string($notes);        

        $sqlStatement = "
            INSERT INTO Log (statement, status, User_idUser_executedBy, notes, executedTime)
            VALUES ('" . $statement . "', '" . $status . "', '" . $executedBy . "', '" . $notes . "', now())";  

        $mysqliLog_result = null;
        $mysqliLog->query($sqlStatement);
        $mysqliLog_result = $mysqliLog->insert_id;

        if($mysqliLog_result == null) {
            $sqlStatement = date("Y.m.d") . " | " . $sqlStatement;

            // wirte statement to log file instead
            file_put_contents('log/log.txt', $sqlStatement, FILE_APPEND | LOCK_EX);
        }    
    }
		
		     
    /*
    * Public method for access api.
    * This method dynmically call the method based on the query string
    *
    */
    public function processApi(){
        $func = strtolower(trim(str_replace("/","",$_REQUEST['request'])));

        if((int)method_exists($this,$func) > 0)
            $this->$func();
        else
            $this->response('Error code 404, Page not found',500);   // If the method not exist with in this class, response would be "Page not found".
    }
    
                
    /*
    * NAME: addAnnouncement
    * INPUTS: bunch of stuff
    * OUTPUTS: success message
    * DESCRIPTION: 
    *      This adds a new announcement to the database
    */  
    private function announcementAdd() {
        if($this->get_request_method() != "POST") {
            $this->response('',406);
        }    
        $mysqli = new mysqli(self::DB_SERVER,self::DB_USER,self::DB_PASSWORD,self::DB);
        
        // Retrieve all post values that are passed
        $inputJSON = file_get_contents('php://input');
        $input= json_decode( $inputJSON, TRUE ); //convert JSON into array
        $idUser=$mysqli->real_escape_string($input["idUser"]);
        $idProgram=$mysqli->real_escape_string($input["idProgram"]);
        $title=$mysqli->real_escape_string($input["title"]);
        $html=$mysqli->real_escape_string($input["html"]);

        $sqlStatement = "
            INSERT INTO Announcements (title, html, User_idUser,Program_idProgram,dateStart,dateEnd,publish)
            VALUES ('" . $title . "', '" . $html . "', " . $idUser . ", " . $idProgram . ", now(), now(), 'N')";

        // Execute SQL statement for user insert
        $mysqli->query($sqlStatement);
        $mysqli_result = array('lastID' => $mysqli->insert_id); 
        
        $this->response(json_encode($mysqli_result),200);
    }
        
    private function getQuizzers(){
        // Get the contents of the JSON file 
        $quizzerData = file_get_contents("mock-quizzers.json");
        $this->response($quizzerData,200);
    }
    private function getQuizzersAssoc(){
        // Get the contents of the JSON file 
        $quizzerData = $this->readdb();
        $ret=array();
        $arrlength = count($quizzerData);
        for($x = 0; $x < $arrlength; $x++) {
            $tmp=$quizzerData[$x];
            $id=$tmp["id"];
            unset($tmp["id"]);
            $ret[$id]=$tmp;
        }

        $this->response(json_encode($ret),200);
    }
    private function getQuizzes(){
        // Get the contents of the JSON file 
        $quizzesData = file_get_contents("quizzes.json");
        $this->response($quizzesData,200);
    }
    private function getTeams(){
        // Get the contents of the JSON file 
        $teamsData = file_get_contents("teams.json");
        $this->response($teamsData,200);
    }

    private function getUser(){
        if($this->get_request_method() != "GET") {
            $this->response('',406);
        }

        $idUser=$this->_request['idUser'];
        // $idProgram=$this->_request['idProgram'];
        // $idEventGroup=$this->_request['idEventGroup'];
        
        // Get the contents of the JSON file 
        $quizzerData = file_get_contents("mock-quizzers.json");
        // Convert to array 
        $array = json_decode($quizzerData, true);

        $ret=array();
        $arrlength = count($array);
        for($x = 0; $x < $arrlength; $x++) {
            $user=$array[$x];
            // $tst=($user["id"]==$idUser & $user["program"]==$idProgram & $user["eventGroup"]==$idEventGroup);
            $tst=($user["id"]==$idUser);
            if($tst>0){$ret[]=$user;break;}
        }
        if(count($ret)){
            $this->response(json_encode($ret[0]),200);
        }
        
    }

    private function getQuiz(){
        if($this->get_request_method() != "GET") {
            $this->response('',406);
        }

        $idQuiz=$this->_request['idQuiz'];
        $array = $this->readquizdb();

        $ret=array();
        $arrlength = count($array);
        for($x = 0; $x < $arrlength; $x++) {
            $quiz=$array[$x];
            // $tst=($user["id"]==$idUser & $user["program"]==$idProgram & $user["eventGroup"]==$idEventGroup);
            $tst=($quiz["id"]==$idQuiz);
            if($tst>0){$ret[]=$quiz;break;}
        }
        if(count($ret)){
            $this->response(json_encode($ret[0]),200);
        }
        
    }
    private function getTeam(){
        if($this->get_request_method() != "GET") {
            $this->response('',406);
        }

        $idTeam=$this->_request['idTeam'];
        // Convert to array 
        $array = $this->readteamdb();

        $ret=array();
        $arrlength = count($array);
        for($x = 0; $x < $arrlength; $x++) {
            $team=$array[$x];
            // $tst=($user["id"]==$idUser & $user["program"]==$idProgram & $user["eventGroup"]==$idEventGroup);
            $tst=($team["id"]==$idTeam);
            if($tst>0){$ret[]=$team;break;}
        }
        if(count($ret)){
            $this->response(json_encode($ret[0]),200);
        }
        
    }
    
    private function addUser(){
        
        if($this->get_request_method() == "OPTIONS") {
            // need for pre-flight response
            $this->response('',200);
        }
        
        if($this->get_request_method() != "POST") {
            $this->response('',406);
        }

        // Retrieve all post values that are passed
        $postdata = file_get_contents('php://input');
        if(isset($postdata) && !empty($postdata)){
            $newuser= json_decode( $postdata, TRUE );
            
            // Get the contents of the JSON file, convert to array
            $array = $this->readdb();
            $arrlength = count($array);
            $nextid=0;
            for($x = 0; $x < $arrlength; $x++) {
                $user=$array[$x];
                if($user["id"]>=$nextid){$nextid=$user["id"]+1;}
            }

            $newuser["id"]=$nextid;
            $array[]=$newuser;

            $this->writedb($array);
            $this->response(json_encode($newuser),200);
        } 
    }

    private function addQuiz(){
        
        if($this->get_request_method() == "OPTIONS") {
            // need for pre-flight response
            $this->response('',200);
        }
        
        if($this->get_request_method() != "POST") {
            $this->response('',406);
        }

        // Retrieve all post values that are passed
        $postdata = file_get_contents('php://input');
        if(isset($postdata) && !empty($postdata)){
            $newquiz= json_decode( $postdata, TRUE );
            
            // Get the contents of the JSON file, convert to array
            $array = $this->readquizdb();
            $arrlength = count($array);
            $nextid=0;
            for($x = 0; $x < $arrlength; $x++) {
                $quiz=$array[$x];
                if($quiz["id"]>=$nextid){$nextid=$quiz["id"]+1;}
            }

            $newquiz["id"]=$nextid;
            $array[]=$newquiz;

            $this->writequizdb($array);
            $this->response(json_encode($newquiz),200);
        } 
    }

    private function addTeam(){
        
        if($this->get_request_method() == "OPTIONS") {
            // need for pre-flight response
            $this->response('',200);
        }
        
        if($this->get_request_method() != "POST") {
            $this->response('',406);
        }

        // Retrieve all post values that are passed
        $postdata = file_get_contents('php://input');
        if(isset($postdata) && !empty($postdata)){
            $newteam= json_decode( $postdata, TRUE );
            
            // Get the contents of the JSON file, convert to array
            $array = $this->readteamdb();
            $arrlength = count($array);
            $nextid=0;
            for($x = 0; $x < $arrlength; $x++) {
                $team=$array[$x];
                if($team["id"]>=$nextid){$nextid=$team["id"]+1;}
            }

            $newteam["id"]=$nextid;
            $array[]=$newteam;

            $this->writeteamdb($array);
            $this->response(json_encode($newteam),200);
        } 
    }

    private function deleteUser(){
        
        if($this->get_request_method() == "OPTIONS") {
            // need for pre-flight response
            $this->response('',200);
        }
        
        if($this->get_request_method() != "DELETE") {
            $this->response('',406);
        }

        // Retrieve all post values that are passed
        $idUser=$this->_request['idUser'];

        // Get the contents of the JSON file, convert to array
        $array = $this->readdb();
        $arrlength = count($array);
        $idx=-1;
        for($x = 0; $x < $arrlength; $x++) {
            $user=$array[$x];
            if($user["id"]==$idUser){
                $idx=$x;
                break;
            }
        }

        // if idUser is found
        if($idx>0){
            unset($array[$idx]);
            $arr2=array_values($array);
            $this->writedb($arr2);
            $this->response(1,200);
        }
        else{
            $this->response(0,200);
        }

    }

    private function updateUser(){
        
        if($this->get_request_method() == "OPTIONS") {
            // need for pre-flight response
            $this->response('',200);
        }
        
        if($this->get_request_method() != "PUT") {
            //var_dump($this->get_request_method());
            //$msg=$this->get_request_method();
            //echo "<script>console.debug( \"PHP DEBUG: $msg\" );</script>";
            $this->response('',406);
        }

        // Retrieve all post values that are passed
        $postdata = file_get_contents('php://input');
        if(isset($postdata) && !empty($postdata)){
            $input= json_decode( $postdata, TRUE );
            

            // Get the contents of the JSON file, convert to array
            
            $array = $this->readdb();
            
            $arrlength = count($array);
            
            for($x = 0; $x < $arrlength; $x++) {
                $user=$array[$x];
                if($user["id"]==$input["id"]){
                    $array[$x]["name"]=$input["name"];
                    $array[$x]["program"]=$input["program"];
                    $array[$x]["eventGroup"]=$input["eventGroup"];
                }
            }
            
            $this->writedb($array);
            
            //convert JSON into array
            //$idUser=$mysqli->real_escape_string($input["idUser"]);
            //$firstName=$mysqli->real_escape_string($input['firstName']);  
            //var_dump($input);
            $this->response(1,200);
        } 
    }

    private function updateQuiz(){
        
        if($this->get_request_method() == "OPTIONS") {
            $this->response('',200);
        }
        if($this->get_request_method() != "PUT") {
            $this->response('',406);
        }

        // Retrieve all post values that are passed
        $postdata = file_get_contents('php://input');
        if(isset($postdata) && !empty($postdata)){
            $input= json_decode( $postdata, TRUE );
            // Get the contents of the JSON file, convert to array
            $array = $this->readquizdb();
            $arrlength = count($array);
            for($x = 0; $x < $arrlength; $x++) {
                $quiz=$array[$x];
                if($quiz["id"]==$input["id"]){
                    $array[$x]["date"]=$input["date"];
                    $array[$x]["quizNumber"]=$input["quizNumber"];
                    $array[$x]["question"]=$input["question"];
                    $array[$x]["program"]=$input["program"];
                    $array[$x]["eventGroup"]=$input["eventGroup"];
                    $array[$x]["active"]=$input["active"];
                    $array[$x]["teams"]=$input["teams"];
                }
            }
            
            $this->writequizdb($array);
            $this->response(1,200);
        } 
    }

    private function updateTeam(){
        
        if($this->get_request_method() == "OPTIONS") {
            $this->response('',200);
        }
        if($this->get_request_method() != "PUT") {
            $this->response('',406);
        }

        // Retrieve all post values that are passed
        $postdata = file_get_contents('php://input');
        if(isset($postdata) && !empty($postdata)){
            $input= json_decode( $postdata, TRUE );
            // Get the contents of the JSON file, convert to array
            $array = $this->readteamdb();
            $arrlength = count($array);
            for($x = 0; $x < $arrlength; $x++) {
                $team=$array[$x];
                if($team["id"]==$input["id"]){
                    $array[$x]["quizzers"]=$input["quizzers"];
                    $array[$x]["program"]=$input["program"];
                    $array[$x]["eventGroup"]=$input["eventGroup"];
                }
            }
            
            $this->writeteamdb($array);
            $this->response(1,200);
        } 
    }

    function readdb(){
        $quizzerData = file_get_contents("mock-quizzers.json");
        $array = json_decode($quizzerData, true);
        return $array;
    }

    function readquizdb(){
        $quizData = file_get_contents("quizzes.json");
        $array = json_decode($quizData, true);
        return $array;
    }

    function readteamdb(){
        $teamData = file_get_contents("teams.json");
        $array = json_decode($teamData, true);
        return $array;
    }

    private function writedb($arr){
        $fp = fopen("mock-quizzers.json", 'w');
        fwrite($fp, json_encode($arr, JSON_PRETTY_PRINT));
        fclose($fp);
        return 1;
    }
    
    private function writequizdb($arr){
        $fp = fopen("quizzes.json", 'w');
        fwrite($fp, json_encode($arr, JSON_PRETTY_PRINT));
        fclose($fp);
        return 1;
    }

    private function writteamdb($arr){
        $fp = fopen("teams.json", 'w');
        fwrite($fp, json_encode($arr, JSON_PRETTY_PRINT));
        fclose($fp);
        return 1;
    }
    
                
}

// Initiiate Library
$api = new API;
$api->processApi();
?>