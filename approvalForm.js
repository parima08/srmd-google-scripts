HEET_TO_WATCH = "PR",
    APPROVAL_COLUMN = 9,
    COMMENTS_COLUMN = 8, 
    FILE_COLUMN = 7,
    EMAIL_COLUMN = 6,
    ADMIN_EMAIL = "",
    NO = "NO", 
    YES = "YES",
    APPROVED_ARCHIVE_FOLDER_ID = "0B05JMUbC2KVqUGVOdEVTeXl3VjQ", 
    FOLDER = "";


function onEdit(e) {
  //emails the email address specified in that row of the spreadsheet. 
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var activeCell = ss.getActiveCell(); 
    var activeRow = ss.getActiveRange().getRow();
    var activeColumn = ss.getActiveRange().getColumn();
    var activeSheet = ss.getActiveSheet()
    Logger.clear(); 
    
    //checks if the active cell is in approval column otherwise return
    if(activeColumn == APPROVAL_COLUMN){
    
    
      //get filename
      fileUrl = activeSheet.getRange(activeRow, FILE_COLUMN).getValue(); 
      fileId = getIdFromUrl(fileUrl); 
      file = DriveApp.getFileById(fileId); 
      fileName = file.getName(); 
      
      approvalFolder = DriveApp.getFolderById(APPROVED_ARCHIVE_FOLDER_ID); 
      
      //TODO: move file to an approved folder if approved. 
      
      //set approval message
      approval = activeSheet.getRange(activeRow, APPROVAL_COLUMN).getValue();  
      approvalString = ""; 
      subjectString = ""
      //approvalString = "active Row: " + activeRow + " active column: " + activeColumn + "approval value: " + approval;
      
      if(approval === "YES"){
        approvalString = "been approved. You may use this file.";  
        subjectString = "Request Approved: ";  
        file.makeCopy(approvalFolder).setName(file.getName());
        file.setTrashed(true);
      }
      else if(approval === "NO"){
        approvalString = "not been approved. You may not use this file.";
        subjectString = "Request Denied: ";
      }
      else{
        //value was cleared so don't send email
        return; 
      }
      
      Logger.log(approvalString); 
      
      
      //set comment message if it exists
      
      comments = activeSheet.getRange(activeRow, COMMENTS_COLUMN).getValue(); 
      commentsString = ""; 
      if(comments){
        commentsString = " \nWe have some feedback: \n" + comments; 
      }
      Logger.log(comments); 
      
      //get email:     
      recipient_email = activeSheet.getRange(activeRow, EMAIL_COLUMN).getValue();
      //TODO: CHECK IF THE EMAIL IS NULL
      
      //sends the email;
      recipients = recipient_email; 
      subject = subjectString + fileName; 
      body = "Your request for your file " + fileName + " has "+ approvalString + commentsString; 
      MailApp.sendEmail(recipients, subject, body);
    } 
}

function getIdFromUrl(url) { return url.match(/[-\w]{25,}/); }

