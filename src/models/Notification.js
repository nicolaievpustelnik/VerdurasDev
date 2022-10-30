const { model } = require('mongoose');

const notificationSchema = require('./schemas/notificationSchema');


class Notification {
  constructor(employee, errorMessage) {
    this=employee;
    this=errorMessage;
    this.Date.today();
  }


    printMessage() {
    console.log(this.errorMessage);
    }
    getAll(){
        return `Notification[Employee:${this.employee}, errorMessage:${this.errorMessage},Date:${Date.today()}`;}
    }      
 notificationSchema.loadClass(Notification);
module.exports = model("Notification", notificationSchema);
  

