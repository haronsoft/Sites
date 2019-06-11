<?php
if($_POST['username'] != '' && $_POST['email'] != '' && $_POST['subject'] != '' && $_POST['comment'] != ''){
	
	
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	$headers .= 'From: ' . $_POST["username"] . '<' . $_POST["email"] . '>' . "\r\n" .
    'Reply-To: ' . $_POST["email"] . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
	
	$subject = 'New mail from Galliope';
	$message = '<b>Name:</b> '.$_POST["username"].'<br>
	<b>Email:</b> '.$_POST["email"].'<br>
	<b>Subject:</b> '.$_POST["subject"].'<br>
	<b>Message:</b> '.$_POST["comment"];
	
	mail( "lesh1j@yandex.by", $subject, $message, $headers ); //  Replace with your email 
	
	echo '<div class="alert alert-success alert-dismissable">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
			Your message has been send!
		</div>';
	
}else{
			
	echo '<div class="alert alert-danger alert-dismissable">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
			All fields as required!
		</div>';
}
?>