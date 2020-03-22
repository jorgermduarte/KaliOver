var fs = require('fs');


class CommandGroupsManagement{

    constructor(){
        this.json = "[]";
        this.parsed = [];

        try {
            this.json = fs.readFileSync(process.cwd() + "/src/models/commands.json");
            this.parsed = JSON.parse(this.json);
          } catch(err) {
            console.log(err)
        }
    }

    SampleStructure(){
        return {
            title : "",
            description : "",
            commands : []
        };
    }

    AddNewCommand(command){
        console.log(command);
        this.parsed.push(command);
        this.SaveFile();
    }

    FindFile(id){
        if(this.parsed[id] != null){
            return this.parsed[id]
        }else
            return null;
    }

    Update(id,cmd){
        this.parsed[id] = cmd;
        this.SaveFile();
    }

    SaveFile(){
        fs.writeFileSync(process.cwd() + "/src/models/commands.json", JSON.stringify(this.parsed))
    }

}

module.exports = CommandGroupsManagement