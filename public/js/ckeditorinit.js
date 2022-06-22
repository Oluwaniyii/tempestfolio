    /**
     * Initailizing ckeditor build and setting it to window properties
     */

    /**
     * 
     * @param {string} editorIdentifier 
     * @description creates an instance of ckeditor and stores it in window object
     */
    function newCkeditor(editorIdentifier, editorId){
        console.log(editorIdentifier, editorId)
        // if(!editorIdentifier) throw new Error("editor Identifier is not passed in");
        // if(!editorId) throw new Error("editor id is not passed in");

        ClassicEditor.create( document.querySelector(`#${editorId}`), {
            licenseKey: '',
        } )
        .then( ckeditor => {
            // window[`${editorIdentifier}`] = ckeditor;
            const ckeditorObjects = {};
            ckeditorObjects[editorIdentifier] = ckeditor;
            console.log(ckeditor);
            // console.log(window[editorIdentifier]);
        } )
        .catch( error => {
            console.error( 'Oops, something went wrong!' );
            console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
            console.warn( 'Build id: 6ipdhxgd5iyr-ai837debbwht' );
            console.error( error );
        } );
    }
   

    /**
     * 
     * @param {string} editorIdentifier
     * @param {boolean} escaped format type: default is escaped
     * @returns {string}
     * @description gets ckeditor data input from a form and returns
     */

    function getCkeditorData(editorIdentifier, escaped=false){
        if(!editorIdentifier) throw new Error("editor Identifier is not passed in");

        let ckeditorData = (window[editorIdentifier]).getData({format: 'string'});

        if(escaped){
            ckeditorData = ckeditorData.replace(/"/g, '\"');
            ckeditorData = ckeditorData.replace(/</g, '&lt;');
            ckeditorData = ckeditorData.replace(/>/g, '&gt;');
        }

        return ckeditorData;
    }


    /**
     * 
     * @param {*} data 
     * @returns 
     */

    function setCkeditorDefaultdata(editorIdentifier, data){
        if(!editorIdentifier) throw new Error("editor Identifier is not passed in");
        (window[editorIdentifier]).data.set(data);
    }

    /**
     * 
     * @param {string} data 
     * @returns {string}
     * @description takes data with escaped or markdown tags format and returns html tags format 
     * 
     */
    function parseCkescapedData(data){
        let parseData = data.replace(/&lt;/g, '<');
        parseData = parseData.replace(/&gt;/g, '>');
    
        return parseData;
    }