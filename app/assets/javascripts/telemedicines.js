$(document).ready(function(){
	var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

	var drugName;
	var treatedForEDMedication = [];
	var resetBP = false;
	var otherRecreationalDrugs = false;
	var whichMedication = false;
	var whichAllergies = false;
	var checkedTroubledInfo = false;
	var isThereAnything = false;
	var noPreference = true;
	
	$('#telemedicineLaw-btn').click(function(){
		$('#telemedicinelaw-info').hide();
		$('#zipcode-info').show();
	});

	// $('#zipcode-btn').click(function(){
	// 	$('#zipcode-info').hide();
	// 	$('#dob-info').show();
	// });

	$("#zipcode-btn").click(function (e) {
		var zip_code = $("#zip_code").val();
		if (zip_code == ""){			
			alert("Oops! Please enter zip code.");
			return false
		}
		else if(/\D/.test(zip_code)){			
			alert("Oops! Please enter valid zip code.");
			return false
		}else if(zip_code.length < 5){
			alert("Oops! Please enter a 5-digit zip code.");
			return false
		}else if(!checkValidZip(zip_code)){
			alert("Oops! Please enter valid zip code.");
			return false
		}else{
			$('#zipcode-info').hide();
			$('#dob-info').show();
		}
	});

	function checkValidZip(zip_code) {
    var result="";
    $.ajax({
      url: "/telemedicines/check_valid_zip",
      async: false,
      data: {user:{zip_code}},
      success: function(value) {
        result = value;
      }
    });
    return result;
  }
	$(function(){
	  $('.datepicker1').fdatepicker({
			format: 'mm/dd/yyyy',
			disableDblClickSelection: true,
			leftArrow:'<<',
			rightArrow:'>>'
	  })
	});

	$('#backButton_1').click(function(){		
		$('#telemedicinelaw-info').show();
		$('#zipcode-info').hide();
	});

	$('#dob-btn').click(function(){
		if($("#dob").val()){
			$('#dob-info').hide();
			$('#email-info').show();
			$("#dob-error").html("");			
		}else{
			$("#dob-error").html("Please enter Date of Birth.")
		}
	});

	$('#backButton_2').click(function(){		
		$('#zipcode-info').show();
		$('#dob-info').hide();
		$("#dob-error").html("");	
	});

	$('#email-btn').click(function(){
		if($("#email").val() == "" || !($("#email").val().match(emailReg) != null)){
			$("#email-error").html("Please enter valid email address.")
		}else{
			$('#email-info').hide();
			$('#gender-info').show();
			$("#email-error").html("");
		}
	});

	$('#backButton_3').click(function(){		
		$('#dob-info').show();
		$('#email-info').hide();
		$("#email-error").html("");
	});

	$('.gender').click(function(){
		$('#gender-info').hide();
		if($("input[name='gender']:checked").val() == 'Male'){
			$('#anticipate-times-info').show();
		}else{
			$("#gender-female-info").show();
		}		
	});

	$('#backButton_4').click(function(){		
		$('#gender-info').hide();
		$('#email-info').show();
	});

	$('#backButton_5').click(function(){		
		$('#anticipate-times-info').hide();
		$('#gender-info').show();
	});

	$('#gender-female-btn').click(function(){
		if($("#female_email_1").val() == "" || !($("#female_email_1").val().match(emailReg) != null)){
			$("#female-email-error").html("Please enter valid email address");
		}else if($("#female_comments").val() == ""){
			$("#female-email-error").html("Please enter comments");
		}else{	
			$('#gender-female-info').hide();
			$('#gender-female-final').show();
			submitData();
			$("#female-email-error").html("");
		}
	});

	$('#backButton_6').click(function(){		
		$('#gender-female-info').hide();
		$('#gender-info').show();
		$("#female-email-error").html("");
	});

	$('#backButton_7').click(function(){		
		$('#gender-female-final').hide();
		$('#gender-female-info').show();		
	});

	$('.anticipate-times').click(function(){		
		$('#anticipate-times-info').hide();
		$('#drug-preference-info').show();		
	});

	$('#backButton_8').click(function(){		
		$('#drug-preference-info').hide();
		$('#anticipate-times-info').show();		
	});

	$('.drug-preference').click(function(){
		$('#no-preference-div').html('')		
		$('#drug-preference-info').hide();
		$('#dosage-preference-info').show();
		drugName = $("input[name='Do you have a drug preference?']:checked").val()
		var drugPrice = parseFloat($("input[name='Do you have a drug preference?']:checked").attr('drug-price'));
		$(".drugName").text(drugName);		
		$('.drugStrength').text(DRUG_PREFERENCE[drugName][drugPrice]);
		$('.drugStrength-btn').text(DRUG_PREFERENCE[drugName][drugPrice].toUpperCase());
		$('.drugPrice').text(drugPrice);
		noPreference = false;
		$("input[name='Drug Strength']").val(DRUG_PREFERENCE[drugName][drugPrice]);
	});
	//last start
	$('#no-preference-btn').click(function(){
		$('#drug-preference-info').hide();
		$('#how-often-do-you-want-your-medication-to-be-shipped-no-preference').show();
		$("input[name='Do you have a drug preference?']:checked").prop('checked', false);
		$('#no-preference-div').html('<input type="hidden" name="Do you have a drug preference?" value="No">')
		$("input[name='Drug Strength']").val("");
	});

	$('#backButton-no-preference').click(function(){
		$('#how-often-do-you-want-your-medication-to-be-shipped-no-preference').hide();
		$('#drug-preference-info').show();
	});

	$("#how-often-do-you-want-your-medication-to-be-shipped-no-preference-btn").click(function(){
		$("#have-you-ever-been-treated-for-ED").show();
		$('#how-often-do-you-want-your-medication-to-be-shipped-no-preference').hide();
		$("input[name='Shipped Type']").val("Shipped every 3 months");
		$("input[name='Total Billed']").val(0);
	});

	$("#how-often-do-you-want-your-medication-to-be-shipped-month-no-preference-btn").click(function(){
		$("#have-you-ever-been-treated-for-ED").show();
		$('#how-often-do-you-want-your-medication-to-be-shipped-no-preference').hide();
		$("input[name='Shipped Type']").val("Shipped every month");
		$("input[name='Total Billed']").val(0);
	});
	//last end

	$('#backButton_9').click(function(){
		$('#dosage-preference-info').hide();
		$('#drug-preference-info').show();
		noPreference = true;
	});

	$("#dosage-preference-info-btn").click(function(){
		$.ajax({		 
		  url: "/telemedicines/dosage_preference_list",			 
		  data: {drug_name: drugName}
		});
	});


	$('#backButton_11').click(function(){
		$('#how-often-do-you-want-your-medication-to-be-shipped').hide();
		$('#dosage-preference-list-info').show();
	});

	$('#dosage-preference-btn').click(function(){
		$('#dosage-preference-info').hide();
		$('#backButton_11').hide();
		$('#backButton_12').show();
		$('#how-often-do-you-want-your-medication-to-be-shipped').show();
		var drugPrice = parseFloat($("input[name='Do you have a drug preference?']:checked").attr('drug-price'));
		var perMonthQuntity = $("input[name='How many times do you anticipate using the medication for sexual activity, if prescribed?']:checked").val();	
		var totalPricePerMonth = (drugPrice * perMonthQuntity)
		var totalPricePerMonthWD = 	totalPricePerMonth
		if(totalPricePerMonth > DESCOUNT_THRESHOLD){
			totalPricePerMonth = totalPricePerMonth - 5;
			$('#how-often-do-you-want-your-medication-to-be-shipped-btn').text("SAVE $60 A YAER")		
		}else{
			$('#how-often-do-you-want-your-medication-to-be-shipped-btn').text("CONFIRM 3-MONTH SHIPPING")
		}
		var totalPrice3Month = totalPricePerMonth * 3;
		$("#drug-month-price").text(totalPricePerMonth);
		$("#drug-3-month-price").text(totalPrice3Month);
		$("#drug-month-price-wd").text(totalPricePerMonthWD);
	});

	$('#backButton_12').click(function(){
		$('#how-often-do-you-want-your-medication-to-be-shipped').hide();
		$('#dosage-preference-info').show();
	});

	$("#how-often-do-you-want-your-medication-to-be-shipped-month-btn").click(function(){
		$("#have-you-ever-been-treated-for-ED").show();
		$('#how-often-do-you-want-your-medication-to-be-shipped').hide();
		$("input[name='Shipped Type']").val("Shipped every month");
		$("input[name='Total Billed']").val($("#drug-month-price-wd").text());
	});

	$('#backButton_13').click(function(){
		$("#have-you-ever-been-treated-for-ED").hide();
		if (noPreference){
			$('#how-often-do-you-want-your-medication-to-be-shipped-no-preference').show();
		}else{			
			$('#how-often-do-you-want-your-medication-to-be-shipped').show();
		}
	});

	$(".have-you-ever-been-treated-for-ED").change(function(){
		var unCheck = true;
		if(this.checked){
			$('#have-you-ever-been-treated-for-ED-WM-btn').show();
			$('#have-you-ever-been-treated-for-ED-NM-btn').hide();
		}else{
			$(".have-you-ever-been-treated-for-ED").each(function(){				
				if(this.checked){
					unCheck = false
				}
			});
			if(unCheck){
				$('#have-you-ever-been-treated-for-ED-WM-btn').hide();
				$('#have-you-ever-been-treated-for-ED-NM-btn').show();
			}
		}
	});

	$("#how-often-do-you-want-your-medication-to-be-shipped-btn").click(function(){
		$("#have-you-ever-been-treated-for-ED").show();
		$('#how-often-do-you-want-your-medication-to-be-shipped').hide();
		$("input[name='Shipped Type']").val("Shipped every 3 months");
		$("input[name='Total Billed']").val($("#drug-3-month-price").text());
	});

	$('#have-you-ever-been-treated-for-ED-WM-btn').click(function(){	
		treatedForEDMedication = [];
		$.each($("input[name='Have you ever been treated for ED?[]']:checked"), function(){		
			treatedForEDMedication.push($(this).val());			
		});		
		$.ajax({		 
		  url: "/telemedicines/treated_for_ed",			 
		  data: {medications: treatedForEDMedication}
		});
		$('#backButton_26').hide();
		$('#backButton_25').show();	
	});

	$("#have-you-ever-been-treated-for-ED-NM-btn").click(function(){		
		$('#stisfying-enough-for-sex').show();
		$('#have-you-ever-been-treated-for-ED').hide();
		$('#backButton_26').show();
		$('#backButton_25').hide();	
	});

	$('#backButton_26').click(function(){
		$('#stisfying-enough-for-sex').hide();		
		$('#have-you-ever-been-treated-for-ED').show();		
	});

	$('.do-you-ever-have-a-problem-getting-an-erection-that-is-satisfying-enough-for-sex').click(function(){
		$('#stisfying-enough-for-sex').hide();
		$('#how-did-your-ED-begin').show();
	});

	$('#backButton_27').click(function(){
		$('#stisfying-enough-for-sex').show();
		$('#how-did-your-ED-begin').hide();
	});

	$('.how-did-your-ED-begin').click(function(){
		$('#how-did-your-ED-begin').hide();
		$('#do-you-get-erections').show();
	});

	$('#backButton_28').click(function(){
		$('#do-you-get-erections').hide();
		$('#how-did-your-ED-begin').show();
	});

	$('.do-you-get-erections').change(function(){
		var unCheck = true
		$(".do-you-get-erections").each(function(){				
			if(this.checked){
				unCheck = false
			}
		});
		if(unCheck){
			$('#do-you-get-erections-btn').text("NEITHER")
		}else{
			$('#do-you-get-erections-btn').text("CONTINUE")
		}
	});

	$('#do-you-get-erections-btn').click(function(){
		$('#do-you-get-erections').hide();
		var erections = [];
		$.each($("input[name='Do you get erections?[]']:checked"), function(){		
			erections.push($(this).val());			
		});		
		$.ajax({		 
		  url: "/telemedicines/get_erections",			 
		  data: {erections: erections}
		});
	});

	$('.blood-pressure').click(function(){
		$('#blood-pressure').hide();
		if($(this).val() == 'I Do not know my blood pressure'){
			$('#email-info3').show();
		}else{
			$('#top-blood-pressure-reading').show();
		}
	});

	$('#backButton_35').click(function(){
		$('#email-info3').hide();
		$('#blood-pressure').show();
		$("#email-info3-error").html("");
	});

	$('#backButton_36').click(function(){
		$('#top-blood-pressure-reading').hide();
		if(resetBP){
			$('#confirm-blood-pressure-reading').show();
		}else{			
			$('#blood-pressure').show();
		}
		resetBP = false;
	});

	$('#email-info3-btn').click(function(){
		if($("#email_3").val() == "" || !($("#email_3").val().match(emailReg) != null)){
			$("#email-info3-error").html("Please enter valid email address.")
		}else{
			submitData();
			$("#email-info3-error").html("");
		}
	});
	$("#email-info2-btn").click(function(){
		if($("#email_2").val() == "" || !($("#email_2").val().match(emailReg) != null)){
			$("#email-2-error").html("Please enter valid email address.");
		}else{
			submitData();
			$("#email-2-error").html("");
		}
	});

	$('.top-blood-pressure-reading').click(function(){
		$('#top-blood-pressure-reading').hide();
		$('#bottom-blood-pressure-reading').show();
		$('.top-bp-reading').text($(this).val());
	});

	$('#backButton_37').click(function(){
		$('#bottom-blood-pressure-reading').hide();
		$('#top-blood-pressure-reading').show();
	});

	$('.bottom-blood-pressure-reading').click(function(){
		$('#bottom-blood-pressure-reading').hide();
		$('#confirm-blood-pressure-reading').show();		
		$('.bottom-bp-reading').text($(this).val());
	});

	$('#backButton_38').click(function(){
		$('#confirm-blood-pressure-reading').hide();
		$('#bottom-blood-pressure-reading').show();
	});

	$('.confirm-blood-pressure-reading').click(function(){
		$('#confirm-blood-pressure-reading').hide();
		if($(this).val() == 'Yes, that is my blood pressure'){
			$('#describes-your-libido').show();
		}else{
			resetBP = true
			$('#top-blood-pressure-reading').show();
		}
	});

	$('#backButton_39').click(function(){
		$('#describes-your-libido').hide();
		$('#confirm-blood-pressure-reading').show();
	});

	$('.describes-your-libido').click(function(){
		$('#describes-your-libido').hide();
		$('#select-ED-conditions').show();
		$("#modal1").modal({		  
		  fadeDuration: 1000,
	  	fadeDelay: 0.50,
	  	escapeClose: false,
	  	clickClose: false
		});		
	});
	// $("#modal1-btn").click(function(){
	// 	$("#modal1").hide();
	// });

	$('#backButton_40').click(function(){
		$('#select-ED-conditions').hide();
		$('#describes-your-libido').show();
	});

	$(".select-ED-conditions").change(function(){
		var unCheckOP = true;		
		$(".select-ED-conditions").each(function(){				
			if(this.checked){
				unCheckOP = false
			}
		});
		if(unCheckOP){
			$('#select-ED-conditions-btn').text("NONE APPLY");
		}else{
			$('#select-ED-conditions-btn').text("CONTINUE");
		}
	});

	$('#select-ED-conditions-btn').click(function(){
		$('#select-ED-conditions').hide();
		$('#select-conditions').show();
	});

	$('#backButton_41').click(function(){
		$('#select-conditions').hide();
		$('#select-ED-conditions').show();
	});

	$(".select-conditions").change(function(){
		var unCheckOPS = true;		
		$(".select-conditions").each(function(){				
			if(this.checked){
				unCheckOPS = false
			}
		});
		if(unCheckOPS){
			$('#select-conditions-btn').text("NONE OF THE ABOVE");
		}else{
			$('#select-conditions-btn').text("CONTINUE");
		}
	});

	$('#select-conditions-btn').click(function(){
		$('#select-conditions').hide();
		$('#lifestyle-habits').show();
	});

	$('#backButton_42').click(function(){
		$('#lifestyle-habits').hide();
		$('#select-conditions').show();
	});

	$(".lifestyle-habits").change(function(){
		var unCheckOPS = true;		
		$(".lifestyle-habits").each(function(){				
			if(this.checked){
				unCheckOPS = false
			}
		});
		if(unCheckOPS){
			$('#lifestyle-habits-btn').text("NONE APPLY");
		}else{
			$('#lifestyle-habits-btn').text("CONTINUE");
		}
	});

	$('#lifestyle-habits-btn').click(function(){
		$('#lifestyle-habits').hide();
		$('#both-effective-and-safe-dosages-of-medication-conditions').show();
	});

	$('#backButton_43').click(function(){
		$('#both-effective-and-safe-dosages-of-medication-conditions').hide();
		$('#lifestyle-habits').show();
	});

	$(".both-effective-and-safe-dosages-of-medication-conditions").change(function(){
		var unCheckEffectiveOP = true;		
		$(".both-effective-and-safe-dosages-of-medication-conditions").each(function(){				
			if(this.checked){
				unCheckEffectiveOP = false
			}
		});
		if(unCheckEffectiveOP){
			$('#both-effective-and-safe-dosages-of-medication-conditions-btn').text("NONE APPLY");
		}else{
			$('#both-effective-and-safe-dosages-of-medication-conditions-btn').text("CONTINUE");
		}
	});

	$('#both-effective-and-safe-dosages-of-medication-conditions-btn').click(function(){
		$('#both-effective-and-safe-dosages-of-medication-conditions').hide();
		$('#symptoms-options').show();
	});

	$('#backButton_44').click(function(){
		$('#symptoms-options').hide();
		$('#both-effective-and-safe-dosages-of-medication-conditions').show();
	});

	$(".symptoms-options").change(function(){
		var unCheckSymptomsOP = true;		
		$(".symptoms-options").each(function(){				
			if(this.checked){
				unCheckSymptomsOP = false
			}
		});
		if(unCheckSymptomsOP){
			$('#symptoms-options-btn').text("NONE APPLY");
		}else{
			$('#symptoms-options-btn').text("CONTINUE");
		}
	});

	$('#symptoms-options-btn').click(function(){
		$('#symptoms-options').hide();
		$('#symptoms-options-2').show();
	});

	$('#backButton_45').click(function(){
		$('#symptoms-options-2').hide();
		$('#symptoms-options').show();
	});

	$(".symptoms-options-2").change(function(){
		var unCheckSymptoms2OP = true;		
		$(".symptoms-options-2").each(function(){				
			if(this.checked){
				unCheckSymptoms2OP = false
			}
		});
		if(unCheckSymptoms2OP){
			$('#symptoms-options-2-btn').text("NONE APPLY");
		}else{
			$('#symptoms-options-2-btn').text("CONTINUE");
		}
	});

	$('#symptoms-options-2-btn').click(function(){		
		$('#symptoms-options-2').hide();
		$('#conjunction-with-other-medication-info').show();
	});

	$('#backButton_46').click(function(){
		$('#conjunction-with-other-medication-info').hide();
		$('#symptoms-options-2').show();
	});

	$(".conjunction-with-other-medication-info").change(function(){
		var unCheckOther2OP = true;		
		$(".conjunction-with-other-medication-info").each(function(){				
			if(this.checked){
				unCheckOther2OP = false
			}
		});
		if(unCheckOther2OP){
			$('#conjunction-with-other-medication-info-btn').text("NONE APPLY");
		}else{
			$('#conjunction-with-other-medication-info-btn').text("CONTINUE");
		}
	});

	$('#conjunction-with-other-medication-info-btn').click(function(){		
		$('#conjunction-with-other-recreational-drugs-info').show();
		$('#conjunction-with-other-medication-info').hide();
	});

	$('#backButton_47').click(function(){
		$('#conjunction-with-other-recreational-drugs-info').hide();
		$('#conjunction-with-other-medication-info').show();
	});


	$('.conjunction-with-other-recreational-drugs-info').click(function(){
		$('#conjunction-with-other-recreational-drugs-info').hide();
		if($(this).val() == 'No'){
			$('#are-you-taking-any-other-medicines').show();
		}else{
			otherRecreationalDrugs = true;
			$('#which-recreational-drugs-info').show();
		}
	});

	$('#which-recreational-drugs-info-btn').click(function(){
		if($("#Which_recreational_drugs_and_how_frequently_do_you_use_them_").val() == ""){
			$('#which-recreational-drugs-info-error').html("Which recreational drugs and how frequently do you use them?");
		}else{
			$('#which-recreational-drugs-info').hide();
			$('#are-you-taking-any-other-medicines').show();
			$('#which-recreational-drugs-info-error').html("");
		}
	});

	$('#backButton_48').click(function(){
		$('#are-you-taking-any-other-medicines').hide();
		if(otherRecreationalDrugs){
			$('#which-recreational-drugs-info').show();
		}else{			
			$('#conjunction-with-other-recreational-drugs-info').show();			
		}
		otherRecreationalDrugs = false;
	});

	$('#backButton_49').click(function(){
		$('#which-recreational-drugs-info').hide();
		$('#conjunction-with-other-recreational-drugs-info').show();
		$('#which-recreational-drugs-info-error').html("");
	});

	$('.are-you-taking-any-other-medicines').click(function(){
		$('#are-you-taking-any-other-medicines').hide();
		if($(this).val() == 'No'){
			$('#allergies-info').show();
		}else{
			whichMedication = true;
			$('#which-medications-info').show();
		}
	});

	$('#backButton_50').click(function(){
		$('#allergies-info').hide();
		if(whichMedication){
			$('#which-medications-info').show();
		}else{			
			$('#are-you-taking-any-other-medicines').show();
		}
		whichMedication = false;
	});

	$('#backButton_51').click(function(){
		$('#which-medications-info').hide();
		$('#are-you-taking-any-other-medicines').show();
		$('#which-medications-info-error').html("");
	});

	$('#which-medications-info-btn').click(function(){
		if($("#Which_medications__Please_list_dose__as_well").val() == ""){
			$('#which-medications-info-error').html("Which medications? Please list dose, as well.");
		}else{
			$('#which-medications-info').hide();
			$('#allergies-info').show();
			$('#which-medications-info-error').html("");
		}
	});

	$('.allergies-info').click(function(){
		$('#allergies-info').hide();
		if($(this).val() == 'No, I do not have any allergies to food, dyes, or medication'){
			$('#have-you-been-troubled-info').show();
			$("#modal2").modal({		  
			  fadeDuration: 1000,
		  	fadeDelay: 0.50,
		  	escapeClose: false,
		  	clickClose: false
			});
		}else{
			whichAllergies = true;
			$('#allergic-details').show();
		}
	});

	$('#backButton_52').click(function(){
		$('#have-you-been-troubled-info').hide();
		if(whichAllergies){
			$('#allergic-details').show();
		}else{			
			$('#allergies-info').show();
		}
		whichAllergies = false;
		
	});

	$('#backButton_53').click(function(){
		$('#allergic-details').hide();
		$('#allergies-info').show();
		$('#allergic-details-error').html("");
	});

	$('#allergic-details-btn').click(function(){
		if($("#What_are_you_allergic_to_").val() == ""){
			$('#allergic-details-error').html("What are you allergic to?");
		}else{
			$('#allergic-details').hide();
			$('#have-you-been-troubled-info').show();
			$('#allergic-details-error').html("");
			$("#modal2").modal({		  
			  fadeDuration: 1000,
		  	fadeDelay: 0.50
			});
		}
	});
	
	$(".have-you-been-troubled-info").change(function(){
		var unCheckTroubledInfo = true;
		$(".have-you-been-troubled-info").each(function(){				
			if(this.checked){
				unCheckTroubledInfo = false
			}
		});
		if(unCheckTroubledInfo){
			$('#have-you-been-troubled-info-btn').text("NONE OF THE ABOVE");
		}else{
			$('#have-you-been-troubled-info-btn').text("CONTINUE");
		}
	});

	$('#have-you-been-troubled-info-btn').click(function(){		
		$('#have-you-been-troubled-info').hide();
		var isTroubledInfo = false;
		$(".have-you-been-troubled-info").each(function(){
			if(this.checked){
				isTroubledInfo = true;
			}
		});
		if(isTroubledInfo){
			$('#how-often-have-you-been-troubled-info').show();
			checkedTroubledInfo = true;
		}else{
			$('#is-there-anything-else-we-should-know-info').show();
			checkedTroubledInfo = false;
		}
	});

	$('#backButton_54').click(function(){
		$('#how-often-have-you-been-troubled-info').hide();
		$('#have-you-been-troubled-info').show();
	});

	$('#backButton_55').click(function(){
		$('#is-there-anything-else-we-should-know-info').hide();
		if(checkedTroubledInfo){
			$('#how-often-have-you-been-troubled-info').show();
		}else{
			$('#have-you-been-troubled-info').show();
		}
		checkedTroubledInfo = false;
	});

	$('.how-often-have-you-been-troubled-info').click(function(){
		$('#how-often-have-you-been-troubled-info').hide();
		$('#is-there-anything-else-we-should-know-info').show();
	});

	$('.is-there-anything-else-we-should-know-info').click(function(){
		$('#is-there-anything-else-we-should-know-info').hide();
		if($(this).val() == 'No'){
			$('#confirm-pharmacy').show();
			isThereAnything = false
		}else{
			$('#is-there-anything-else-we-should-know-details').show();
			isThereAnything = true
		}
	});

	$('#backButton_56').click(function(){
		$('#is-there-anything-else-we-should-know-details').hide();
		$('#is-there-anything-else-we-should-know-info').show();
		$('#is-there-anything-else-we-should-know-details-error').html("");
	});

	$('#backButton_57').click(function(){
		$('#confirm-pharmacy').hide();
		if(isThereAnything){
			$('#is-there-anything-else-we-should-know-details').show();
		}else{
			$('#is-there-anything-else-we-should-know-info').show();
		}
	});

	$('#is-there-anything-else-we-should-know-details-btn').click(function(){
		if($("#Is_there_anything_else_we_should_know_details__").val() == ""){
			$('#is-there-anything-else-we-should-know-details-error').html("Is there anything else we should know?");
		}else{
			$('#is-there-anything-else-we-should-know-details').hide();
			$('#confirm-pharmacy').show();
			$('#is-there-anything-else-we-should-know-details-error').html("");
		}
	});

	var selectDifferentPharmacy = false;
	$('#select-different-pharmacy-btn').click(function(){
		$("#modal3").modal({		  
		  fadeDuration: 1000,
	  	fadeDelay: 0.50,
	  	escapeClose: false,
	  	clickClose: false  		
		});
		// if (confirm("If you pick a pharmacy outside of the Roman Pharmacy Network, and qualify for a prescription, we will not be able to guarantee the price of the medication and provide free monthly delivery. Are you sure you want to continue?")) {
		//   $('#confirm-pharmacy').hide();
		// 	$('#other-pharmacy-details').show();
		// 	selectDifferentPharmacy = true;
		// }
	});	

	$("#modal3-btn").click(function(){
		$.modal.close();
		$('#confirm-pharmacy').hide();
		$('#other-pharmacy-details').show();
		selectDifferentPharmacy = true;
	});

	$('#other-pharmacy-details-btn').click(function(){
		if($("#Please_enter_the_name_and_address_of_your_pharmacy_of_choice").val() == ""){
			$('#other-pharmacy-details-error').html("Please enter the name and address of your pharmacy of choice.");
		}else{
			$('#other-pharmacy-details').hide();
			$('#user-info').show();
			$('#other-pharmacy-details-error').html("");
		}
	});

	$('#backButton_58').click(function(){
		$('#other-pharmacy-details').hide();
		$('#confirm-pharmacy').show();
		selectDifferentPharmacy = false;
		$('#other-pharmacy-details-error').html("");		
	});

	$('#confirm-pharmacy-btn').click(function(){
		$('#user-info').show();
		$('#confirm-pharmacy').hide();
	});

	$('#backButton_59').click(function(){
		$('#user-info').hide();
		if (selectDifferentPharmacy) {
			$('#other-pharmacy-details').show();			
		}else{
			$('#confirm-pharmacy').show();
		}
		$('#user-info-error').html("");		
	});

	$('#user-info-btn').click(function(){
		if ($("#user_first_name").val() == "" || $("#user_last_name").val() == "" || $("#user_email").val() == "" || $("#user_mobile_phone").val() == "" || $("#user_password").val() == "" || $("#user_street_1").val() == "" || $("#user_city").val() == "" || $("#user_state").val() == "" || $("#user_zip").val() == ""){
			$('#user-info-error').html("Please fill all fields.")
		}else if(!($("#user_email").val().match(emailReg) != null)){
			$('#user-info-error').html("Please enter valid email.")			
		}else{
			$('#user-info').hide();
			$('#user-media-info').show();
			$('#user-info-error').html("");
		}
	});
	

	$('#user-media-info-btn').click(function(){
		if($("#profile_image").val() == "" || $("#photo_id_image").val() == ""){
			$("#user-media-info-error").html("Please upload both images.")
		}else{	
			var perMonthQuntity = $("input[name='How many times do you anticipate using the medication for sexual activity, if prescribed?']:checked").val();
			var drugName = $("input[name='Do you have a drug preference?']:checked").val();
			var drugShippedType = $("input[name='Shipped Type']").val();
			var drugStrength = $("input[name='Drug Strength']").val();
			var totalPrice =  parseFloat($("input[name='Total Billed']").val());
			$.ajax({		  
			  url: "/telemedicines/payment_view",			 
			  data: {"per_nonth_quntity": perMonthQuntity, "drug_name": drugName, "drug_shipped_type": drugShippedType, "drug_strength": drugStrength, "total_price": totalPrice, "different_pharmacy": selectDifferentPharmacy}	  
			});
			$("#user-media-info-error").html("")
		}
	});

	$('#backButton_61').click(function(){
		$('#user-info').show();
		$('#user-media-info').hide();
		$("#user-media-info-error").html("")
	});


	$('body').on('click', '#payment-info-btn', function() {
		if($("input[name='agree_term_condition']:checked").val() == "1"){
			submitData();
		}else{	
			alert("Please accept term and conditions.")
			return false;
		}
	});


	$('#telemedicine_law').change(function(){
    if (this.checked){
    	$("#telemedicineLaw-btn").removeClass('disabled');
    }else{
    	$("#telemedicineLaw-btn").addClass('disabled');
    }    
	});	

	function checkAvailability(data) {		
		return ($.inArray( data, allIds ) != -1);
	}

	function submitData() {
		form_data = new FormData($('.telemedicine-form')[0]);
		// form_data = $('.telemedicine-form').serialize();		
		$.ajax({
		  type: "POST",
		  url: "/telemedicines/telemedicines_servise_save",			 
		  data: form_data,
		  processData: false,
    	contentType: false
		});
	}

	window.onbeforeunload = function() {
  	return "Changes that you made may not be saved.";
	};

	function readURL(input, divId) {
	  if (input.files && input.files[0]) {
	    var reader = new FileReader();
	    reader.onload = function (e) {
	      $('#'+divId).html('<img class="th" src="' + e.target.result +'" alt="your image" height="144px" width="180px" />');
	    }
	    reader.readAsDataURL(input.files[0]);
	  }
	}

	$("#profile_image").change(function(){
	    readURL(this, "image_1");
	});
	$("#photo_id_image").change(function(){
	    readURL(this, "image_2");
	});

	// var backDiv;  
 //  var allIds = [ "telemedicineLaw-btn", "zipcode-btn", "dob-btn", "backButton", "email-btn", "gender", "anticipate-times", "gender-female-btn", ]  
	// $(document).click(function(e){
	// 	curentid = e.target.id;		
	// 	if (checkAvailability(curentid)){
	// 		if(!(curentid == 'backButton')){		
	// 			$('#' + curentid).parent('div').hide();
	// 			if ( curentid == 'gender' && $("input[name='gender']:checked").val() == 'Female'){
	// 				$('#gender-female-info').show();
	// 			}else if(curentid == 'gender-female-btn'){
	// 				$('#gender-female-fanal').show();
	// 				submitData();
	// 			}else{
	// 				$('#' + curentid).parent('div').next('div').show();
	// 			}
	// 			backDiv = curentid;
	// 		}else{			
	// 			$('#' + backDiv).parent('div').next('div').hide();
	// 			$('#' + backDiv).parent('div').show();
	// 			backDiv = $('#' + backDiv).parent('div').prev('div').find('a').attr('id')			
	// 		}
	// 	}
	// })
});