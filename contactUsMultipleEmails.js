var PR_EMAIL = "parima08@gmail.com",
    SRLC_EMAIL = "parima08@gmail.com", 
    PUBLICATIONS_EMAIL = "parima08@gmail.com", 
    NEMIJI_EMAIL = "parima08@gmail.com", 
    AV_EMAIL = "parima08@gmail.com", 
    GENERAL_EMAIL = "parima08@gmail.com";  

function onFormSubmission(e) {
  var submittedValues = e.values; 
  var department = submittedValues[3]; 
  var deparmentEmail = ""; 
  switch(department){
    case "SRLC":
      departmentEmail = SRLC_EMAIL; 
      break; 
    case "Publications": 
      departmentEmail = PUBLICATIONS_EMAIL; 
      break; 
    case "PR": 
      departmentEmail = PR_EMAIL; 
      break; 
    case "Nemiji": 
      departmentEmail = NEMIJI_EMAIL; 
      break; 
    case "AV": 
      departmentEmail = AV_EMAIL; 
      break;
    case "General": 
      departmentEmail = GENERAL_EMAIL; 
      break; 
  }
  
  subject = "Inquiry Message from " + submittedValues[2]; 
  body = submittedValues[4];  
  MailApp.sendEmail(departmentEmail, subject, body);
}
