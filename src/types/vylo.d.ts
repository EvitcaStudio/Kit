
                
	
	/**The world object.*/
	type World = {
                    
		/**
		 * returns an array of diobs in the world depending on the provided arguments; if pType is not set, all diobs in the game will be returned; if pType is set but pChild is not, all diobs with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs in the game will be returned
		 * @env Client | Server
		 * @param {string} [pType] - optional; string containing type path to return
		 * @param {boolean} [pChild] - optional; boolean that determines if child types are included
		 * @returns {Diob[]} returns an array of diobs in the world depending on the provided arguments; if pType is not set, all diobs in the game will be returned; if pType is set but pChild is not, all diobs with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs in the game will be returned
		 */
		getDiobs(pType?: string, pChild?: boolean): Diob[]

        /**
		 * object that will become the contents of 'settings.json' file for your game server
		 * @env Client | Server
		 */
		serverSettings: {[key: string]: unknown, 'port'?: number,'name'?: string,'accessCode'?: 'string','secure'?: {'key': string, 'cert': string}}

        /**
		 * alphanumeric string between 1 and 48 characters needed to list a server and use the api for the game
		 * @env Client | Server
		 */
		webAccessCode: string

        /**
		 * SERVER-ONLY; default 10000; number of milliseconds to wait before pinging a client to see if it is still connected
		 * @env Server
		 */
		pingDelay: number

        /**
		 * SERVER-ONLY; default port to use when hosting; if the host sets a port in settings.json that port will override this one
		 * @env Server
		 */
		mainPort: number

        /**
		 * type of map to use; 'normal' or 'isometric'
		 * @env Client | Server
		 */
		mapMode: 'normal' | 'isometric'

        /**
		 * a string containing the address of the server to automatically connect players to; example '127.0.0.1:1234'
		 * @env Client | Server
		 */
		mainServer: string

        /**
		 * passes an array of objects containing information about the game servers currently online; example {'name': 'Server 1', 'address': '127.0.0.1:1234', 'players': 12, 'guests': 2} would be the data for a server named Server 1 with 12 players and 2 guests on it at 127.0.0.1:1234 address to pFunc
		 * @env Client | Server
		 * @param {Function} pFunc - function to call after the servers have been retrieved
		 */
		getServers(pFunc: Function): void

        /**
		 * returns an array of diobs in the world that have the tag pTag
		 * @env Client | Server
		 * @param {string} pTag - string containing tag to look for
		 * @returns {Diob[]} returns an array of diobs in the world that have the tag pTag
		 */
		getDiobsByTag(pTag: string): Diob[]

        /**
		 * returns an object {'width': world.gameWidth, 'height': world.gameHeight} containing the width and height of the game
		 * @env Client | Server
		 * @returns {{'width': number, 'height': number}} returns an object {'width': world.gameWidth, 'height': world.gameHeight} containing the width and height of the game
		 */
		getGameSize(): {'width': number, 'height': number}

        /**
		 * closes the socket connection
		 * @env Client | Server
		 * @param {string} pAddress - address of server to open a socket to; example '127.0.0.1:1234'
		 * @param {Function} pFunc - function to call once the socket has been opened; an object holding the socket information is passed into pFunc
		 * @param {object} pSettings - object containing settings values; example: {'secure': true}
		 */
		openWebSocket(pAddress: string, pFunc: Function, pSettings: object): void

        /**
		 * name that the server's js file will have, default being 'server' making it 'server.js'
		 * @env Client | Server
		 */
		serverFileName: string

        /**
		 * closes the host socket
		 * @env Server
		 * @param {number} pPort - the port to listen for sockets on
		 * @param {Function} pFunc - the function to call once the host socket has started
		 * @returns {unknown[]} returns an array of all the socket client objects
		 */
		hostWebSocket(pPort: number, pFunc: Function): unknown[]

        /**
		 * checks if Vylocity account pName is a subscriber of the game then calls pFunc; server-side only
		 * @env Server
		 * @param {string | number} pName - name of the Vyocity account to check sub of
		 * @param {Function} pFunc - function to call after the sub check; function is called with up to two parameters where the first is true or false depending on if the account is a sub or not and the second is a string containing an error message if there was one
		 */
		checkSub(pName: string | number, pFunc: Function): void

        /**
		 * plays a sound to all objects in pArr; returns the Sound object
		 * @env Client | Server
		 * @param {string | {'soundName': string, 'volume': number}} pSound - either a string with the name of a sound file, or a string containing the path of a Sound object, or an actual Sound object, or a basic object with the proper information; ex ( {'soundName': 'name', 'volume': 50} )
		 * @param {unknown} [pArr] - optional list of objects to play sound to
		 * @param {unknown} [pStart] - optional; time to start playing the sound at
		 * @param {unknown} [pDuration] - optional; how long to play the sound for
		 * @returns {void} returns the Sound object
		 */
		playSound(pSound: string | {'soundName': string, 'volume': number}, pArr?: unknown, pStart?: unknown, pDuration?: unknown): void

        /**
		 * sends a request of method pMethod to the url pLink and passes the response into pFunc
		 * @env Client | Server
		 * @param {string} pLink - string containing the link to send a request to; for example 'https://vylocity.com/'
		 * @param {string} [pMethod] - optional; string containing method type of request, ex 'POST', 'GET'
		 * @param {object} [pHeaders] - optional; object containing custom headers
		 * @param {unknown} [pData] - optional; data to send with method 'POST'
		 * @param {Function} [pFunc] - optional; function to call after the request has been sent and a response received, the arguments of the function will be (pData, pError) where pData is the data returned and pError the error (if there is one)
		 */
		sendRequest(pLink: string, pMethod?: string, pHeaders?: object, pData?: unknown, pFunc?: Function): void

        /**
		 * SERVER-ONLY; a string containing addresses allowed to use scripts to access and download resources from this game server (currently set for .vyr|.json|.txt files); default '*' which allows all addresses
		 * @env Server
		 */
		resourceOrigin: string

        /**
		 * map to be loaded when the game starts
		 * @env Client | Server
		 */
		mainMap: string

        /**
		 * a string containing the address of the server to download resources from (game server or web server); default '.' which is same address as the game; if using web server, add htaccess file in the resources folder to set header Access-Control-Allow-Origin ex of htaccess file: ( Header set Access-Control-Allow-Origin "*" ); this feature only works for the client of multiplayer, if playing solo the resources at the index location will be used and the server in multiplayer will use its own resource location
		 * @env Client | Server
		 */
		resourceServer: string

        /**
		 * returns an object {'width': world.tileWidth, 'height': world.tileHeight} containing the width and height of the game tiles
		 * @env Client | Server
		 * @returns {{'width': number, 'height': number}} returns an object {'width': world.tileWidth, 'height': world.tileHeight} containing the width and height of the game tiles
		 */
		getTileSize(): {'width': number, 'height': number}

        /**
		 * gracefully reboot the server
		 * @env Client | Server
		 */
		reboot(): void

        /**
		 * string containing the name of the default macro atlas
		 * @env Client | Server
		 */
		mainMacro: string

        /**
		 * returns an array of objects that are in pArr depending on the provided arguments; if pType is not set, all objects in the game will be returned; if pType is set but pChild is not, all diobs with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs in the game will be returned
		 * @env Client | Server
		 * @param {unknown[]} pArr - array to check for objects in
		 * @param {string} [pType] - optional; string containing type path to return
		 * @param {boolean} [pChild] - optional; boolean that determines if child types are included
		 * @returns {unknown[]} returns an array of objects that are in pArr depending on the provided arguments; if pType is not set, all objects in the game will be returned; if pType is set but pChild is not, all diobs with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs in the game will be returned
		 */
		getObjectsFromArray(pArr: unknown[], pType?: string, pChild?: boolean): unknown[]

        /**
		 * returns a string containing the address of the server or client; for example '1.2.3.4:1234' for server and 'localhost' always for client
		 * @env Client | Server
		 * @returns {string} returns a string containing the address of the server or client; for example '1.2.3.4:1234' for server and 'localhost' always for client
		 */
		getHostAddress(): string

        /**
		 * goes to pLink and passes the content of the page to pFunc once it is finished
		 * @env Client
		 * @param {string} pLink - string containing the link to read; for example 'http://vylocity.com/'
		 * @param {Function} pFunc - function to call after the content has been retrieved
		 * @param {unknown} [pMime] - CLIENT-ONLY; optional; set the mime type; ex text/html or application/octet-stream
		 */
		getWebContent(pLink: string, pFunc: Function, pMime?: unknown): void

        /**
		 * SERVER-ONLY; reference to the node process (https://nodejs.org/api/process.html); warning: for advanced users
		 * @env Server
		 */
		nodeProcess: NodeJS.Process

        /**
		 * version of the game
		 * @env Client | Server
		 */
		gameVersion: string | number

        /**
		 * displays pMes to the console
		 * @env Client | Server
		 * @param {string} pMes - message to display
		 */
		log(pMes: string): void

        /**
		 * returns a string containing the game version
		 * @env Client | Server
		 * @returns {string | number} returns a string containing the game version
		 */
		getGameVersion(): string | number

        /**
		 * outputs text to an interface element for all clients; if pInt or pEl is not set or is invalid, text goes to client.mainOutput
		 * @env Client | Server
		 * @param {string} pText - text to be displayed
		 * @param {string} pInt - string containing interface file name to output to
		 * @param {string} pEl - string containing the interface element name to output to
		 */
		outputText(pText: string, pInt: string, pEl: string): void

        /**
		 * SERVER-ONLY; a string containing the address that can access the API ( '*' to allow all ) or an array of strings for each address with access
		 * @env Server
		 */
		apiOrigin: string | string[]

        /**
		 * sends a string message pMes to another server located at pAddress; game server getting the message must have World/apiOrigin set to allow the message
		 * @env Client | Server
		 * @param {string} pAddress - address of the server to send a message to
		 * @param {string} pMes - string containing the message to send
		 * @param {Function} [pCallback] - optional; function to call after the message has been sent; the function will have two arguments, the first being an error if there was one, the second being the response from the server (the return value of the World/onMessage)
		 */
		sendMessage(pAddress: string, pMes: string, pCallback?: Function): void

        /**
		 * called when a map finishes loading
		 * @env Client | Server
		 * @event
		 * @param {string | number} pName - name of map that has loaded
		 */
		onMapLoaded(pName: string | number): void

        /**
		 * string containing the path of the mob for the player to control
		 * @env Client | Server
		 */
		mainMob: string

        /**
		 * returns an array of all connected clients
		 * @env Client | Server
		 * @returns {Client[]} returns an array of all connected clients
		 */
		getClients(): Client[]

        /**
		 * terminates the connection and prevents any queued data from being processed
		 * @env Server
		 * @param {object} pDatabase - object containing database information
		 * @param {Function} [pFunc] - optional; hostname of database; default localhost
		 * @returns {object} returns one argument that contains any error information<br />
			called: returns the connection pool object after connecting to the MySQL database pDatabase
		 */
		openMySQL(pDatabase: object, pFunc?: Function): object

        /**
		 * returns a string containing information about what the code type is; code ran in solo will return 'local'; code ran in multi-player client will return 'client'; code ran on the server will return 'server'
		 * @env Client | Server
		 * @returns {'local' | 'client' | 'server'} returns a string containing information about what the code type is; code ran in solo will return 'local'; code ran in multi-player client will return 'client'; code ran on the server will return 'server'
		 */
		getCodeType(): 'local' | 'client' | 'server'

        /**
		 * gracefully shut down the server
		 * @env Client | Server
		 */
		shutdown(): void

        /**
		 * returns the diob with the specified ID
		 * @env Client | Server
		 * @param {string} pID - id of the diob to get
		 * @returns {Diob} returns the diob with the specified ID
		 */
		getDiobByID(pID: string): Diob

        /**
		 * an object containing width and height of tiles on the map {'width': 32, 'height': 32}; acts as the default size of diobs
		 * @env Client | Server
		 */
		tileSize: {'width': number, 'height': number}

        /**
		 * a number; 1 for single player game, 2 for multi-player game, 3 for single and multi-player
		 * @env Client | Server
		 */
		playerMode: 1 | 2 | 3

        /**
		 * returns a string contain server IP and port in 'ip:port' format
		 * @env Client | Server
		 * @returns {string} returns a string contain server IP and port in 'ip:port' format
		 */
		getAddress(): string

        /**
		 * sends a notification with the message pMessage to the Vylocity account pName and then calls pFunc; server-side only
		 * @env Server
		 * @param {string | number} pName - name of the Vyocity account to send notification to
		 * @param {unknown} pMessage - message to send; 256 characters max
		 * @param {Function} pFunc - function to call after the notification has been sent or attempted; function is called with up to two parameters where the first is true or false depending on the success of the send and the second is a string containing an error message if there was one
		 */
		sendNotification(pName: string | number, pMessage: unknown, pFunc: Function): void

        /**
		 * only manually set this if you are using the offline IDE and are setting the source to match the game id for vylocity.com
		 * @env Client | Server
		 */
		gameID: number

        /**
		 * evaluates the JavaScript code in the pScript string; if the world is running on the server-side this code will be Node.js
		 * @env Client | Server
		 * @param {string} pScript - a string containing the JavaScript code to evaluate
		 */
		evalWebScript(pScript: string): void

        /**
		 * returns a number containing the game's player mode
		 * @env Client | Server
		 * @returns {number} returns a number containing the game's player mode
		 */
		getPlayerMode(): number

        /**
		 * array of files to preload when the game starts up or '*' to load all resources; if no name is provided, all resources of that type will be preloaded; for example [{'type': 'icon', 'name': 'icon1'}, {'type': 'sound'}] to load an icon named icon1 and all sound resources; all interface files and macro files are automatically preloaded; you may include remote resources by giving the object a 'remote' property and setting it to the web URL path of the resource
		 * @env Client | Server
		 */
		preloadResources: {'type': string, 'name': string}[] | '*'

        /**
		 * kicks the client pClient and displays the pReason message to them if there is one
		 * @env Client | Server
		 * @param {Client} pClient - client to kick
		 * @param {string} [pReason] - optional; message to display to the client being kicked
		 */
		kickClient(pClient: Client, pReason?: string): void

        /**
		 * SERVER-ONLY; default 50; number of milliseconds to wait before sending built-in engine packets (custom client packets are sent immediately)
		 * @env Server
		 */
		packetDelay: number

        /**
		 * default 45; how many tiles to combine into chunks to improve efficiency for rendering and networking; recommended to use at least 1.5x map view, so if the map view is 1920x1080 and the tile size is 32x32, you would want at least 90 chunk (90x90 tiles); if a part of the remaining map (after other parts have been chunked) is smaller than the chunk size, it will be added to the nearest chunk instead
		 * @env Client | Server
		 */
		mapChunk: number

        /**
		 * sends the data for the pD diob to all clients in the world, if pVar is set it will send only those variables, if it is not set it will only send built-in engine variables
		 * @env Server
		 * @param {Diob} pD - reference to the diob to send
		 * @param {unknown[]} [pVar] - optional; variable name or array of variable names
		 */
		sendDiob(pD: Diob, pVar?: unknown[]): void
                
	}
            
                
	
	/**The base object that Diob extends from.*/
	type Object = {
                    
		/**
		 * object containing ticker details if in an active ticker; set to null to remove from ticker
		 * @env Client | Server
		 */
		inTicker: object

        /**
		 * sets the pVal value of the pVar static variable belonging to the type pType; static variables are variables that belong to all Objects of this type collectively and are different than normal variables, usually static variables can only be set once, but VyScript static variables may be changed if that is what the developer wants
		 * @env Client | Server
		 * @param {unknown} pVar - name of the static variable to set
		 * @param {boolean} pVal - value to give to the static variable
		 */
		setStaticVariable(pVar: unknown, pVal: boolean): void

        /**
		 * returns the static variable value belonging to the type pType
		 * @env Client | Server
		 * @param {unknown} pVar - name of the static variable to get
		 * @returns {unknown} returns the static variable value belonging to the type pType
		 */
		getStaticVariable(pVar: unknown): unknown
                
	}
            
                
	
	/**The diob object.*/
	type Diob = {
                    
		/**
		 * returns true if this Diob is currently shown on the screen, false if not
		 * @env Client | Server
		 * @returns {void} returns true if this Diob is currently shown on the screen, false if not
		 */
		checkScreenShown(): void

        /**
		 * removes the specified filter
		 * @env Client | Server
		 * @param {string | number} pName - name of filter to remove
		 */
		removeFilter(pName: string | number): void

        /**
		 * sets the diob's overlays to the array pOver
		 * @env Client | Server
		 * @param {Diob[]} pOver - array of overlays to set this diob's overlays to
		 * @param {boolean} [pSave] - optional; if set, removed overlays will not be deleted, otherwise this call will delete removed overlays after removing them from the overlays
		 */
		setOverlays(pOver: Diob[], pSave?: boolean): void

        /**
		 * when this diob has a transition change; if pVar, pChange, and pStart are all unset then this is the event called when all transitions have ended
		 * @env Client | Server
		 * @event
		 * @param {string} pVar - a string containing the name of the variable involved in the transition
		 * @param {unknown} pChange - the amount changed
		 * @param {object} pStart - if this is set then this is the event called when a transition starts; this will be a reference to the transition object used
		 */
		onTransition(pVar: string, pChange: unknown, pStart: object): void

        /**
		 * returns an array of diobs currently in this diob's viewer array
		 * @env Client | Server
		 * @returns {unknown[]} returns an array of diobs currently in this diob's viewer array
		 */
		getInvisibilityViewers(): unknown[]

        /**
		 * if set, diob will be invisible to all other diobs with visibility less than this value
		 * @env Client | Server
		 */
		invisibility: number

        /**
		 * sets this diob's icon anchor to pX and pY; default is 0.5,0.5 which is the center of the diob's icon (0,0 would be the top-left corner); 
		 * @env Client | Server
		 * @param {number} pX - default 0.5; x value of the diob's icon anchor
		 * @param {number} [pY] - optional; default 0.5; y value of the diob's icon anchor
		 */
		setAnchor(pX: number, pY?: number): void

        /**
		 * modifies scale, angle, or alpha of the over screen
		 * @env Client | Server
		 * @param {object} pMod - object containing mods; scale, angle, alpha; ex ( {'angle': 0.8} )
		 * @param {unknown} [pAdd] - optional; if set, the values in pMod will be added to the current mod object
		 */
		setOverScreenMod(pMod: object, pAdd?: unknown): void

        /**
		 * moves this to specified location; if pVal1 and pVal2 are numbers, this is moved to the coordinate pVal1, pVal2; if pVal1 is an object but not a tile, this is moved to the location of object; if pVal1 is a tile, this is moved to that tile
		 * @env Client | Server
		 */
		setLoc(): Diob

        /**
		 * returns the current diob being used as a mask
		 * @env Client | Server
		 * @returns {Diob} returns the current diob being used as a mask
		 */
		getMask(): Diob

        /**
		 * a string to be displayed as text above the diob
		 * @env Client | Server
		 */
		text: string

        /**
		 * adds pDiob to this diob's viewer array, allowing pDiob to always see this diob
		 * @env Client | Server
		 * @param {Diob} pDiob - the diob to add
		 */
		addInvisibilityViewer(pDiob: Diob): void

        /**
		 * when this diob and pD have overlapping bounding boxes and one of them changes position and stays overlapped
		 * @env Client | Server
		 * @event
		 * @param {Diob} pD - diob that is crossed with this diob
		 * @param {unknown} pInit - if set, pD was relocated and initiated the event
		 */
		onCrossedRelocated(pD: Diob, pInit: unknown): void

        /**
		 * turns this diob's sprite into a repeating pattern; call with no arguments to return to a normal sprite
		 * @env Client | Server
		 * @param {number} pX - default 0; position where the pattern starts on the x-axis
		 * @param {number} pY - default 0; position where the pattern starts on the y-axis
		 * @param {number} [pWidth] - optional; width of the pattern
		 * @param {number} [pHeight] - optional; height of the pattern
		 */
		setPattern(pX: number, pY: number, pWidth?: number, pHeight?: number): void

        /**
		 * determines if the object is dense or not; true or false for dense or not, or a number for value, over 1 for different densities; for example, density 3 diobs can move over density 2 and lower diobs but not anything density 3 or higher
		 * @env Client | Server
		 */
		density: unknown

        /**
		 * name of icon inside object's icon atlas
		 * @env Client | Server
		 */
		iconName: string

        /**
		 * adds the specified filter
		 * @env Client | Server
		 * @param {string | number} pName - name of the filter; only one name may be used at a time, using the name will remove the old filter with that name
		 * @param {string} pType - the type of filter to add; below is the types and their specific possible pArgs values
		 * @param {unknown} pArgs - color-based filter
		 */
		addFilter(pName: string | number, pType: string, pArgs: unknown): void

        /**
		 * position of object on the grid x-axis
		 * @env Client | Server
		 */
		xCoord: number

        /**
		 * sets the width and height of the diob
		 * @env Client | Server
		 * @param {number} pWidth - value to set the diob's width to
		 * @param {number} pHeight - value to set the diob's height to
		 */
		setSize(pWidth: number, pHeight: number): void

        /**
		 * called when a packet is sent from this diob on the client or server using diob.sendPacket
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - client that sent the packet
		 * @param {string | number} pName - name of packet
		 * @param {unknown} pData - any data containing information for packet; ex {'a': 1, 'b': 2} or 'test'
		 */
		onPacket(pClient: Client, pName: string | number, pData: unknown): void

        /**
		 * called when the mouse clicks this object
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - client of the mouse
		 * @param {number} pX - the x position of the mouse over the diob
		 * @param {number} pY - the y position of the mouse over the diob
		 * @param {unknown} pButton - the button used; 1 for left, 2 for middle, 3 for right
		 */
		onMouseClick(pClient: Client, pX: number, pY: number, pButton: unknown): void

        /**
		 * the region that the diob is in
		 * @env Client | Server
		 */
		region: unknown

        /**
		 * name of atlas the object's icon is in
		 * @env Client | Server
		 */
		atlasName: string

        /**
		 * returns an array of diobs that are crossing this diob using the provided arguments; if pType is not set, all diobs will be returned; if pType is set but pChild is not, all diobs with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs will be returned
		 * @env Client | Server
		 * @param {string} [pType] - optional; string containing type path to return
		 * @param {boolean} [pChild] - optional; boolean that determines if child types are included
		 * @returns {Diob[]} returns an array of diobs that are crossing this diob using the provided arguments; if pType is not set, all diobs will be returned; if pType is set but pChild is not, all diobs with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs will be returned
		 */
		getCrossed(pType?: string, pChild?: boolean): Diob[]

        /**
		 * changes the appearance of the diob based on the values provided by pDiob
		 * @env Client | Server
		 * @param {Diob} pDiob - object containing the appearance information or a diob itself; values used: atlasName, iconName, iconState, width, height, layer, scale, color, alpha, transform, anchor, angle, composite, plane, text, textStyle, animator, overlays, overScreen
		 */
		setAppearance(pDiob: Diob): void

        /**
		 * sets the x and y origin offsets
		 * @env Client | Server
		 * @param {number} pX - the x offset of the origin of this object from the left
		 * @param {number} pY - the y offset of the origin of this object from the top
		 */
		setOrigin(pX: number, pY: number): void

        /**
		 * if set, the client will not interpolation position changes
		 * @env Client | Server
		 */
		preventInterpolation: unknown

        /**
		 * default 0; number of pixels to offset the text by on the y-axis
		 * @env Client | Server
		 */
		textStyle: object

        /**
		 * name of the type of the object
		 * @env Client | Server
		 */
		type: string

        /**
		 * unique ID of the diob
		 * @env Client | Server
		 */
		id: unknown

        /**
		 * the diob's transformation matrix or transformation object; example [scaleX, skewY, 0, skewX, scaleY, 0, moveX, moveY, 1] where scaleX scales the diob's appearance on the x-axis, skewY skews on the y-axis, moveX moves on the x-axis, skewX skews on the x-axis, scaleY scales on the y-axis, moveY moves on the y-axis, and the last three are static for matrix; example {'scaleX': 2, 'skewY': 0.1} would scale by 2 on the x-axis and skew by 0.1 on the y-axis for object
		 * @env Client | Server
		 */
		transform: object | number[]

        /**
		 * sets the scale of the diob
		 * @env Client | Server
		 * @param {number} pX - number to scale the width of the diob by; for example 2 would be a 200% scale
		 * @param {number} [pY] - optional; number to scale the height of the diob by; for example 2 would be a 200% scale; pX used if null
		 */
		setScale(pX: number, pY?: number): void

        /**
		 * transitions this diob's pO properties from their current values to the new values over time; if pO is not set all transitions will be cancelled and all properties will automatically go to their end transition values; current allowed properties: alpha, angle, scale, xScale, yScale, xIconOffset, yIconOffset
		 * @env Client | Server
		 * @param {object} pO - object containing properties to transition; ex {'alpha': 0.5, 'xIconOffset': 20}
		 * @param {number} pS - number of steps to take to transition the properties; default 1; -1 for a step every frame
		 * @param {number} pT - number of milliseconds between each step; default 100; if pS is -1 then this is the total time
		 * @param {number} [pQ] - optional; if set, this transition will be added to a queue and happen after the current transition finishes or the rest of the queue clears; set as -1 to merge this with the last thing in the queue
		 * @param {number} [pLoop] - optional; if set, this transition will be added to the current loop of transitions and repeat until told to stop, if this transition is first, this can be set to a specify number to stop looping after that amount of loops; -1 to loop forever
		 * @param {string} [pEase] - optional; use an easing equation that isn't linear; options: 'quadraticIn', 'quadraticOut', 'quadraticInOut', 'cubicIn', 'cubicOut', 'cubicInOut', 'quarticIn', 'quarticOut', 'quarticInOut', 'quinticIn', 'quinticOut', 'quinticInOut', 'sineIn', 'sineOut', 'sineInOut', 'expoIn', 'expoOut', 'expoInOut', 'circularIn', 'circularOut', 'circularInOut'
		 */
		setTransition(pO: object, pS: number, pT: number, pQ?: number, pLoop?: number, pEase?: string): void

        /**
		 * the tile that the diob is on
		 * @env Client | Server
		 */
		loc: unknown

        /**
		 * when this diob leaves the client's screen view
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - a reference to the client
		 */
		onScreenHide(pClient: Client): void

        /**
		 * returns the transformation matrix of this diob
		 * @env Client | Server
		 * @param {unknown} [pAsObj] - optional; if set, the diob's transformation matrix will be returned as an object, for example {'scaleX': scaleX, 'skewY': skewY}
		 * @returns {void} returns the transformation matrix of this diob
		 */
		getTransform(pAsObj?: unknown): void

        /**
		 * returns the over screen mod
		 * @env Client | Server
		 * @returns {void} returns the over screen mod
		 */
		getOverScreenMod(): void

        /**
		 * returns an object {'atlas': atlasName, 'icon': iconName} containing the diob's icon atlas and icon names
		 * @env Client | Server
		 * @returns {object} returns an object {'atlas': atlasName, 'icon': iconName} containing the diob's icon atlas and icon names
		 */
		getIcon(): object

        /**
		 * grabs an object with the screen x offset, y offset, width, height, settings, and either an array of pixel data or a data url depending on pType (data returned client-side only). The data can then be changed and used elsewhere or drawn onto another screen. To read the width and height you could use object.width and object.height, where object is the object returned by the function. The object data array is as follows: object.data[0] is the red value (0-255) of the pixel at 0,0, object.data[1] is the green value (0-255) of the pixel at 0,0, object.data[2] is the blue value (0-255) of the pixel at 0,0, and object.data[3] is the alpha value (0-255) of the pixel at 0,0. Then object.data[4], object.data[5], object.data[6], and object.data[7] are the respective values for the pixel at 1,0. This trend continues through the whole array for every pixel.  object ex: {'x': 0, 'y': 0, 'width': 100, 'height': 100, 'data': ''}
		 * @env Client
		 * @param {string} pType - type of data to get; 'url', 'pixels', 'canvas', or 'sprite'
		 */
		getOverScreen(pType: string): void

        /**
		 * angle of the diob (0 to 2PI)
		 * @env Client | Server
		 */
		angle: number

        /**
		 * changes the over screen information; adding data optional
		 * @env Client | Server
		 * @param {number} pX - x offset of display
		 * @param {number} pY - y offset of display
		 * @param {number} pWidth - width of display
		 * @param {number} pHeight - height of display
		 * @param {unknown} [pData] - optional; data to add to the screen
		 * @param {object} [pSet] - optional; settings object; ex ( {'scaleNearest': true} );
		 */
		setOverScreen(pX: number, pY: number, pWidth: number, pHeight: number, pData?: unknown, pSet?: object): void

        /**
		 * when this diob changes maps; this event will be called twice if the map has not already been loaded, once before loading and once after the loading has completed (the first event will have pBefore set)
		 * @env Client | Server
		 * @event
		 * @param {string} pMap - name of the old map or name of the new map if pBefore is set
		 * @param {unknown} pBefore - if set then the map is currently loading and this is the pre-load event
		 */
		onMapChange(pMap: string, pBefore: unknown): void

        /**
		 * returns an object {'width': width, 'height': height} containing the diob's width and height
		 * @env Client | Server
		 * @returns {object} returns an object {'width': width, 'height': height} containing the diob's width and height
		 */
		getSize(): object

        /**
		 * custom string used to identify the diob
		 * @env Client | Server
		 */
		tag: string

        /**
		 * all invisible diobs with invisibility levels equal to or less than this will be visible to this diob
		 * @env Client | Server
		 */
		visibility: number

        /**
		 * called when the mouse double clicks this object
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - client of the mouse
		 * @param {number} pX - the x position of the mouse over the diob
		 * @param {number} pY - the y position of the mouse over the diob
		 * @param {unknown} pButton - the button used; 1 for left, 2 for middle
		 */
		onMouseDblClick(pClient: Client, pX: number, pY: number, pButton: unknown): void

        /**
		 * when an object exits the contents of another object
		 * @env Client | Server
		 * @event
		 * @param {Diob} pDiob - object that exited
		 */
		onExited(pDiob: Diob): void

        /**
		 * performs the specified draw function using the specified pArgs object; ex ( {'type': 'image', 'image': this, 'x': 1, 'y': 1} )
		 * @env Client | Server
		 * @param {object | object[]} pArgs - an object or array of objects which determines the settings of the draw
		 */
		overScreenDraw(pArgs: object | object[]): void

        /**
		 * how visible the diob appears; (0 to 1); 0 completely invisible, 1 completely visible, between partially visible, higher the number the more visible
		 * @env Client | Server
		 */
		alpha: number

        /**
		 * changes display icon of object
		 * @env Client | Server
		 * @param {string} pAtlas - name of atlas icon is in
		 * @param {string} pIcon - name of icon in pAtlas
		 */
		setIcon(pAtlas: string, pIcon: string): void

        /**
		 * position on the y-axis of the origin from the top edge of the diob
		 * @env Client | Server
		 */
		yOrigin: number

        /**
		 * position of object on the grid y-axis
		 * @env Client | Server
		 */
		yCoord: number

        /**
		 * returns an object {'x': xOrigin, 'y': yOrigin} containing the diob's x and y origin offsets
		 * @env Client | Server
		 * @returns {object} returns an object {'x': xOrigin, 'y': yOrigin} containing the diob's x and y origin offsets
		 */
		getOrigin(): object

        /**
		 * when this diob changes icons
		 * @env Client | Server
		 * @event
		 */
		onIconUpdate(): void

        /**
		 * returns an object {'x': x,'y': y} containing the x and y icon offsets
		 * @env Client | Server
		 * @returns {object} returns an object {'x': x,'y': y} containing the x and y icon offsets
		 */
		getIconOffsets(): object

        /**
		 * turns pMask into a mask which this diob interacts with; transparent portions of the pMask's icon will cut out those same spots from this diob's icon
		 * @env Client | Server
		 * @param {Diob} pMask - diob to use as a mask
		 */
		setMask(pMask: Diob): void

        /**
		 * if this diob is an Overlay type or is being used as an overlay, this will be set; if the overlay has a parent diob, this will be a reference to that diob
		 * @env Client | Server
		 */
		isOverlay: unknown

        /**
		 * height to use when calculating y position relayering
		 * @env Client | Server
		 */
		relayerHeight: unknown

        /**
		 * SERVER-ONLY; if set, the server will not update clients when changes are made; can be 'true' to prevent all clients from getting updated or can be an object containing variables and/or specific clients to ignore; possible variables 'pos', 'dir', 'icon'; ex ( {'type': ['pos', 'dir'], 'client': [someClient]} )
		 * @env Server
		 */
		preventClientUpdates: unknown

        /**
		 * called when a mouse wheel button is scrolled upward while over this object
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - client of the mouse
		 * @param {number} pX - the x position of the mouse over the diob
		 * @param {number} pY - the y position of the mouse over the diob
		 */
		onMouseWheelScrollUp(pClient: Client, pX: number, pY: number): void

        /**
		 * data shared automatically from the server-side to clients that have a sync for this diob; changing the variable will update any clients that have this diob's sync in realtime
		 * @env Client | Server
		 */
		clientSyncData: unknown

        /**
		 * sends a packet to a client or server specifically for this diob, depending on where the code is executed; client code executing this will send the packet to the server; server code executing this will send the packet to the client; this will invoke Diob/onPacket on client-side if the sendPacket is server-side and on the server-side if it is on the client-side
		 * @env Client | Server
		 * @param {string | number} pName - name of packet to send
		 * @param {unknown} pData - data to be sent; ex {'a': 1, 'b': 2} or 'test'
		 * @param {Client} [pClient] - SERVER ONLY; optional; specific client or array of clients to send this packet to; if no client is specified the packet will be sent to all clients currently synced with this diob
		 */
		sendPacket(pName: string | number, pData: unknown, pClient?: Client): void

        /**
		 * returns an object {'x': x, 'y': y} containing the x and y coord offsets of the object
		 * @env Client | Server
		 * @returns {object} returns an object {'x': x, 'y': y} containing the x and y coord offsets of the object
		 */
		getCoordOffsets(): object

        /**
		 * removes all overlays with the pOver type or the exact overlay matching pOver
		 * @env Client | Server
		 * @param {string | Diob | Object} pOver - string of the type of object or overlay to remove or actual overlay to remove
		 * @param {unknown} [pSave] - optional; if set, the overlay will not be deleted, otherwise this call will delete pOver after removing it from the overlays
		 */
		removeOverlay(pOver: string | Diob | Object, pSave?: unknown): void

        /**
		 * called when the mouse exits this object
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - client of the mouse
		 * @param {number} pX - the x position of the mouse over the diob
		 * @param {number} pY - the y position of the mouse over the diob
		 */
		onMouseExit(pClient: Client, pX: number, pY: number): void

        /**
		 * returns an object {'x': x, 'y': y} containing the x and y positions of the diob on the map
		 * @env Client | Server
		 * @returns {{'x': number,'y': number}} returns an object {'x': x, 'y': y} containing the x and y positions of the diob on the map
		 */
		getPos(): {'x': number,'y': number}

        /**
		 * how many pixels object is offset on the grid x-axis from the xCoord
		 * @env Client | Server
		 */
		xCoordOffset: number

        /**
		 * if set, any movable with the same density as this diob may cross over it
		 * @env Client | Server
		 */
		allowDensityCross: boolean

        /**
		 * when an object enters the contents of another object
		 * @env Client | Server
		 * @event
		 * @param {Diob} pDiob - object that entered
		 */
		onEntered(pDiob: Diob): void

        /**
		 * height of the collision box of the object
		 * @env Client | Server
		 */
		height: number

        /**
		 * string containing composite value that determines how this diob is drawn with other diobs on the same plane; possible values: normal, add, multiply, screen
		 * @env Client | Server
		 */
		composite: 'source-over' | 'source-atop' | 'source-in' | 'source-out' | 'destination-over' | 'destination-atop' | 'destination-in' | 'destination-out' | 'lighter' | 'copy' | 'xor' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity'

        /**
		 * sets the animation frame to pFrame and freezes for pDelay milliseconds before returning to the previous frame or continuing on if pCont is set
		 * @env Client | Server
		 * @param {number} pFrame - frame number
		 * @param {number} [pDelay] - optional; delay in milliseconds to freeze the newly set frame for; passing in -1 will pause the animation until you unpause it by changing the diob's 'animator.isPaused' to false
		 * @param {boolean} [pCont] - optional; if true, animation will play like normal after the frame delay; false will return the animation to the frame it was at before the set after the delay
		 */
		setFrame(pFrame: number, pDelay?: number, pCont?: boolean): void

        /**
		 * returns an object containing the information for the diob's current animation; current variables, onFrame for the current frame the animation is on, frameCount for total number of frames in the animation, atlasName for atlas of the current animation, iconName for icon name of current animation, iconState for state of current animation; example {'onFrame': 1, 'frameCount' 20, 'atlasName': '', 'iconName': '', 'iconState': ''}
		 * @env Client | Server
		 * @param {boolean} [pVal] - optional; string with name of specific value to get; options: 'onFrame', 'frameCount', 'atlasName', 'iconName', 'iconState'
		 * @returns {object,number} returns an object containing the information for the diob's current animation; current variables, onFrame for the current frame the animation is on, frameCount for total number of frames in the animation, atlasName for atlas of the current animation, iconName for icon name of current animation, iconState for state of current animation; example {'onFrame': 1, 'frameCount' 20, 'atlasName': '', 'iconName': '', 'iconState': ''}
		 */
		getAnimation(pVal?: boolean): object,number

        /**
		 * when this diob and pMovable no longer have overlapping bounding boxes
		 * @env Client | Server
		 * @event
		 * @param {Diob} pDiob - diob that uncrossed with this diob
		 */
		onUncrossed(pDiob: Diob): void

        /**
		 * called when a mouse button has been pressed while over this object
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - client of the mouse
		 * @param {number} pX - the x position of the mouse over the diob
		 * @param {number} pY - the y position of the mouse over the diob
		 * @param {unknown} pButton - the button used; 1 for left, 2 for middle, 3 for right
		 */
		onMouseDown(pClient: Client, pX: number, pY: number, pButton: unknown): void

        /**
		 * called when the mouse moves after entering this object
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - client of the mouse
		 * @param {number} pX - the x position of the mouse over the diob
		 * @param {number} pY - the y position of the mouse over the diob
		 */
		onMouseMove(pClient: Client, pX: number, pY: number): void

        /**
		 * returns the coords of the diob with an object {'x': x, 'y': y}
		 * @env Client | Server
		 * @returns {object} returns the coords of the diob with an object {'x': x, 'y': y}
		 */
		getCoords(): object

        /**
		 * CLIENT-ONLY; if set, the client will not update the draw layer of this diob when it changes location on the screen
		 * @env Client
		 */
		preventScreenRelayer: boolean

        /**
		 * calls on the client-side when clientSyncData is changed by the server
		 * @env Client | Server
		 * @event
		 * @param {unknown} pOld - old data in clientSyncData
		 */
		onClientSyncData(pOld: unknown): void

        /**
		 * returns an array of locations the diob is on; if diob is a tile, it returns an array containing only itself
		 * @env Client | Server
		 * @returns {Diob[]} returns an array of locations the diob is on; if diob is a tile, it returns an array containing only itself
		 */
		getLocs(): Diob[]

        /**
		 * name of the lowest level parent type
		 * @env Client | Server
		 */
		baseType: string

        /**
		 * sets the coord offset of the object
		 * @env Client | Server
		 * @param {number} pX - the x offset from the xCoord
		 * @param {number} pY - the y offset from the yCoord
		 */
		setCoordOffsets(pX: number, pY: number): void

        /**
		 * name of object
		 * @env Client | Server
		 */
		name: unknown

        /**
		 * sets the icon state of the diob's icon
		 * @env Client | Server
		 * @param {string} pState - state of the icon to set
		 * @param {number} [pFrame] - optional; if true, animation will start from the frame the last iconState left off on
		 */
		setIconState(pState: string, pFrame?: number): void

        /**
		 * when this diob has an overlay removed from it
		 * @env Client | Server
		 * @event
		 * @param {Diob} pD - the diob that was removed from the overlays
		 */
		onRemoveOverlay(pD: Diob): void

        /**
		 * called when a mouse button is released while over this object
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - client of the mouse
		 * @param {number} pX - the x position of the mouse over the diob
		 * @param {number} pY - the y position of the mouse over the diob
		 * @param {unknown} pButton - the button used; 1 for left, 2 for middle, 3 for right
		 */
		onMouseUp(pClient: Client, pX: number, pY: number, pButton: unknown): void

        /**
		 * position on the x-axis of the origin from the left edge of the diob
		 * @env Client | Server
		 */
		xOrigin: number

        /**
		 * when pMovable attempts to cross this diob resulting in overlapping bounding boxes; this function must return 'true' in order for pMovable to cross; this event is called for both diobs if they are both movable; tiles do not have this event
		 * @env Client | Server
		 * @event
		 * @param {unknown} pMovable - movable that is attempting to cross with this diob
		 * @param {unknown} pInit - if set, pMovable initiated the event
		 */
		onCross(pMovable: unknown, pInit: unknown): void

        /**
		 * position on the y-axis from top to bottom of the map
		 * @env Client | Server
		 */
		yPos: number

        /**
		 * when this diob has an overlay added to it
		 * @env Client | Server
		 * @event
		 * @param {Diob} pD - the diob added as an overlay
		 */
		onAddOverlay(pD: Diob): void

        /**
		 * adds an overlay to the object which is a visual icon that always follows the object; returns the new overlay
		 * @env Client | Server
		 * @param {string | Diob | Object} pOver - string of the type of object or overlay to add an overlay of or actual diob to get type from
		 * @param {number | boolean} [pAppearance] - optional; if 1 or positive, this overlay will be be treated as if it is part of the the parent's actual appearance - appearance settings such as angle and alpha of the parent will be used for this overlay and the overlay will be drawn directly on top of the parent so no other diobs that are not an overlay of the parent can appear between it and the parent (it will basically be an extension of the parent's icon); if this is false or 0, the overlay will be treated as an independent diob that just follows the parent around; if -1 or negative it will be treated like if it was 1 but it will appear under the parent instead of above it
		 * @param {boolean} [pSkipEvent] - optional; if true, the onAddOverlay event will not be called
		 * @returns {void} returns the new overlay
		 */
		addOverlay(pOver: string | Diob | Object, pAppearance?: number | boolean, pSkipEvent?: boolean): void

        /**
		 * when this diob enters the client's screen view
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - a reference to the client
		 */
		onScreenShow(pClient: Client): void

        /**
		 * if set, will share animation with all other diobs with the same sync id; ex {'sync': 'water'}
		 * @env Client | Server
		 */
		animator: object

        /**
		 * state of the icon
		 * @env Client | Server
		 */
		iconState: unknown

        /**
		 * return data related to the internal sprite of the diob which 
		 * @env Client | Server
		 * @param {string} pType - the type of data to get 'url' for data url, 'pixels' for array of pixel data, 'canvas' for an HTML canvas element
		 */
		getSpriteData(pType: string): void

        /**
		 * when this diob and pD have overlapping bounding boxes
		 * @env Client | Server
		 * @event
		 * @param {Diob} pD - diob that crossed with this diob
		 * @param {unknown} pInit - if set, pD was relocated and initiated the event
		 */
		onCrossed(pD: Diob, pInit: unknown): void

        /**
		 * set the diob's sprite to pData
		 * @env Client | Server
		 * @param {unknown} pData - the data used as the sprite
		 * @param {string} [pType] - optional; default 'url'; the type of data to get 'url' for data url
		 */
		setSpriteData(pData: unknown, pType?: string): void

        /**
		 * removed pDiob from this diob's viewer array
		 * @env Client | Server
		 * @param {Diob} pDiob - the diob to remove
		 */
		removeInvisibilityViewer(pDiob: Diob): void

        /**
		 * y-axis offset of the icon
		 * @env Client | Server
		 */
		yIconOffset: number

        /**
		 * determines if the cursor executes mouse events on this object or not; 0 to ignore mouse events, 1 for icon size to determine mouse events, 2 for physical size to determine mouse events
		 * @env Client | Server
		 */
		mouseOpacity: unknown

        /**
		 * sets the movable's map position to pX, pY
		 * @env Client | Server
		 * @param {number} pX - value to set the movable's x position on the map to
		 * @param {number} pY - value to set the movable's y position on the map to
		 * @param {string} [pMap] - optional; string containing name of map to set position on
		 */
		setPos(pX: number, pY: number, pMap?: string): void

        /**
		 * returns an array of diobs in the diob's contents using the provided arguments; if pType is not set, all diobs in the diob's contents will be returned; if pType is set but pChild is not, all diobs with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs in the game will be returned
		 * @env Client | Server
		 * @param {string} [pType] - optional; string containing type path to return
		 * @param {boolean} [pChild] - optional; boolean that determines if child types are included
		 * @returns {unknown[]} returns an array of diobs in the diob's contents using the provided arguments; if pType is not set, all diobs in the diob's contents will be returned; if pType is set but pChild is not, all diobs with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs in the game will be returned
		 */
		getContents(pType?: string, pChild?: boolean): unknown[]

        /**
		 * called when the mouse enters this object
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - client of the mouse
		 * @param {number} pX - the x position of the mouse over the diob
		 * @param {number} pY - the y position of the mouse over the diob
		 */
		onMouseEnter(pClient: Client, pX: number, pY: number): void

        /**
		 * order of display of the diob; diobs with the same plane appear together with layers determining the order; a diob with a plane of 1 and layer 1000 will appear below a diob with plane 2 (default planes: Diob 0, Movable 1, Particle 2)
		 * @env Client | Server
		 */
		plane: unknown

        /**
		 * x-axis offset of the icon
		 * @env Client | Server
		 */
		xIconOffset: number

        /**
		 * returns an array of filter names
		 * @env Client | Server
		 * @returns {string[]} returns an array of filter names
		 */
		getFilters(): string[]

        /**
		 * name of the map
		 * @env Client | Server
		 */
		mapName: string

        /**
		 * sets the x and y icon offsets
		 * @env Client | Server
		 * @param {number} pX - the x offset of the icon of this object
		 * @param {number} pY - the y offset of the icon of this object
		 */
		setIconOffsets(pX: number, pY: number): void

        /**
		 * when a movable bumps into this diob
		 * @env Client | Server
		 * @event
		 * @param {unknown} pMovable - movable that did the bumping
		 */
		onBumped(pMovable: unknown): void

        /**
		 * called when a mouse wheel button is scrolled downward while over this object
		 * @env Client | Server
		 * @event
		 * @param {Client} pClient - client of the mouse
		 * @param {number} pX - the x position of the mouse over the diob
		 * @param {number} pY - the y position of the mouse over the diob
		 */
		onMouseWheelScrollDown(pClient: Client, pX: number, pY: number): void

        /**
		 * hex, rgb, rgba, color matrix value, or a tint object; applies color filter to diob; ex ( '#000000' ); ex ( 'rgb(10, 20, 30)' ); ex ( {'tint': 0x444444} )
		 * @env Client | Server
		 */
		color: string | number[] | {'tint': number}

        /**
		 * name of the highest level parent type
		 * @env Client | Server
		 */
		parentType: unknown

        /**
		 * width of the collision box of the object
		 * @env Client | Server
		 */
		width: number

        /**
		 * 0 for no scale or an object {'x': 2, 'y': 2} containing the information for the scale
		 * @env Client | Server
		 */
		scale: unknown

        /**
		 * how many pixels object is offset on the grid y-axis from its yCoord
		 * @env Client | Server
		 */
		yCoordOffset: number

        /**
		 * position on the x-axis from left to right of the map
		 * @env Client | Server
		 */
		xPos: number

        /**
		 * order of display of the diob; higher layer objects appear above lower layer objects
		 * @env Client | Server
		 */
		layer: number

        /**
		 * returns an array of diobs that are overlays of this diob using the provided arguments; if pType is not set, all diobs will be returned; if pType is set but pChild is not, all diobs with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs will be returned
		 * @env Client | Server
		 * @param {string} [pType] - optional; string containing type path to return
		 * @param {boolean} [pChild] - optional; boolean that determines if child types are included
		 * @returns {Diob[]} returns an array of diobs that are overlays of this diob using the provided arguments; if pType is not set, all diobs will be returned; if pType is set but pChild is not, all diobs with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs will be returned
		 */
		getOverlays(pType?: string, pChild?: boolean): Diob[]

        /**
		 * default 0.5; number for both x and y anchors or an object containing both {'x': 0, 'y': 0}; determines where the icon's origin is
		 * @env Client | Server
		 */
		anchor: {'x': number, 'y': number}
		[key: string]: any
                
	}
            
                
	
	/**The movable object.*/
	type Movable = {
                    
		/**
		 * moves movable in the direction of pDir using movable's stepSize until told to stop; takes density into consideration; you can stop movement by calling a different movement function or calling this function with no or null arguments
		 * @env Client | Server
		 * @param {string} pDir - direction to move movable in
		 */
		moveDir(pDir: string): void

        /**
		 * moves the movable by pX x pixels and pY y pixels until told to stop; takes obstacles into consideration; you can stop movement by calling a different movement function or calling this function with no or null arguments
		 * @env Client | Server
		 * @param {number} pX - x value to step by
		 * @param {number} pY - y value to step by
		 */
		movePos(pX: number, pY: number): void

        /**
		 * true if moving using the built-in movement
		 * @env Client | Server
		 */
		isMoving: unknown

        /**
		 * steps the movable by pX x pixels and pY y pixels; takes obstacles into consideration; returns true or false depending on if the step was successful
		 * @env Client | Server
		 * @param {number} pX - x value to step by
		 * @param {number} pY - y value to step by
		 * @param {unknown} pGlide - if set, movement will not stop unless move directions are blocked
		 * @param {unknown} pSlide - if set, the step will occur without changing the movable's direction
		 * @returns {void} returns true or false depending on if the step was successful
		 */
		stepPos(pX: number, pY: number, pGlide: unknown, pSlide: unknown): void

        /**
		 * optional; time between each step, default is 60 steps a second for smoothest possible movement (default of 16.6667)
		 * @env Client | Server
		 */
		moveSettings: unknown

        /**
		 * moves movable pSize pixels in the direction of pDir; if pSize is not set, the size is the movable's stepSize; takes obstacles into consideration; returns true or false depending on if the step was successful
		 * @env Client | Server
		 * @param {string} pDir - direction to move movable in
		 * @param {unknown} pSize - size of step to take
		 * @param {unknown} pSlide - if set, the step will occur without changing the movable's direction
		 * @returns {void} returns true or false depending on if the step was successful
		 */
		stepDir(pDir: string, pSize: unknown, pSlide: unknown): void

        /**
		 * calls either movable.stepPos or movable.stepDir depending on the specified arguments; if pArg1 is a number, movable.stepPos will be called, otherwise movable.stepDir will be called; returns true or false depending on if the step was successful
		 * @env Client | Server
		 * @returns {void} returns true or false depending on if the step was successful
		 */
		step(): void

        /**
		 * calls either movable.movePos or movable.moveDir depending on the specified arguments; if pArg1 is a number, movable.movePos will be called, otherwise movable.moveDir will be called; this moves the movable until told to stop; you can stop movement by calling a different movement function or calling this function with no or null arguments
		 * @env Client | Server
		 */
		move(): void

        /**
		 * string containing the direction of the movable; 'north', 'south', 'east', 'west', 'northwest', 'northeast', 'southwest', 'southeast'
		 * @env Client | Server
		 */
		dir: unknown
		[key: string]: any
                
	}
            
                
	
	/**The particle object.*/
	type Particle = {
                    
		/**
		 * CLIENT-ONLY; if set, the client will not update the draw layer of this diob when it changes location on the screen
		 * @env Client
		 */
		preventScreenRelayer: boolean
		[key: string]: any
                
	}
            
                
	
	/**The tile object.*/
	type Tile = {
                    
		/**
		 * when an object exits the contents of another object
		 * @env Client | Server
		 * @event
		 * @param {Diob} pDiob - object that exited
		 */
		onExited(pDiob: Diob): void

        /**
		 * called before the diob enters the tile; returning false will prevent the diob from entering
		 * @env Client | Server
		 * @event
		 * @param {Diob} pDiob - diob trying to enter this tile
		 * @param {string} pDir - direction of movement diob is attempting to make to enter the tile
		 */
		onEnter(pDiob: Diob, pDir: string): void

        /**
		 * when an object enters the contents of another object
		 * @env Client | Server
		 * @event
		 * @param {Diob} pDiob - object that entered
		 */
		onEntered(pDiob: Diob): void

        /**
		 * called before the diob exits the tile; returning false will prevent the diob from exiting
		 * @env Client | Server
		 * @event
		 * @param {Diob} pDiob - diob trying to exit this tile
		 * @param {string} pDir - direction of movement diob is attempting to make to exit the tile
		 */
		onExit(pDiob: Diob, pDir: string): void
		[key: string]: any
                
	}
            
                
	
	/**The region object.*/
	type Region = {
                    
		/**
		 * when an object exits the contents of another object
		 * @env Client | Server
		 * @event
		 * @param {Diob} pDiob - object that exited
		 */
		onExited(pDiob: Diob): void

        /**
		 * when an object enters the contents of another object
		 * @env Client | Server
		 * @event
		 * @param {Diob} pDiob - object that entered
		 */
		onEntered(pDiob: Diob): void
		[key: string]: any
                
	}
            
                
	
	/**The mob object.*/
	type Mob = {
                    
		/**
		 * a reference to the client of this mob
		 * @env Client | Server
		 */
		client: Client

        /**
		 * when a client no longer has control of a mob
		 * @env Client | Server
		 * @event
		 */
		onLogout(): void

        /**
		 * when a client has taken control of the mob
		 * @env Client | Server
		 * @event
		 */
		onLogin(): void
		[key: string]: any
                
	}
            
                
	
	/**The overlay object.*/
	type Overlay = {
                    
		/**
		 * if true, this overlay will appear directly above the parent and use the same appearance properties as the parent, such as angle and alpha; the overlay will basically be an extension of the parent's icon; instead of true this can be an object containing information on the appearMask, 'shareIcon' to have the overlay share the same iconName as the parent, 'isUnder' to make the overlay appear under the parent instead of above, and 'ownMod' to let the overlay use its own alpha, angle, scale, transform, and composite variables, 'ownState' to have this overlay not sync up with the parent's iconState; ex {'shareIcon': true, 'isUnder': true}
		 * @env Client | Server
		 */
		appearMask: unknown
		[key: string]: any
                
	}
            
                
	
	/**The sound object.*/
	type Sound = {
                    
		/**
		 * number of seconds that have been played into the sound
		 * @env Client | Server
		 */
		currentTime: number

        /**
		 * fades the sound's volume in or out from the current volume to pVol over pDur seconds
		 * @env Client | Server
		 * @param {number} pVol - number between 0 and 100
		 * @param {number} pDur - number of seconds
		 */
		fade(pVol: number, pDur: number): void

        /**
		 * if true, the sound has been manually stopped
		 * @env Client | Server
		 */
		isStopped: boolean

        /**
		 * resume the sound
		 * @env Client | Server
		 */
		resume(): void

        /**
		 * sets the volume of this Sound
		 * @env Client | Server
		 * @param {number} pVol - number between 0 and 100
		 */
		setVolume(pVol: number): void

        /**
		 * stop the sound
		 * @env Client | Server
		 */
		stop(): void

        /**
		 * called when the sound finishes playing
		 * @env Client | Server
		 * @event
		 */
		onEnded(): void

        /**
		 * number of seconds to play the sound for up to the sound file duration
		 * @env Client | Server
		 */
		duration: number

        /**
		 * called when the sound starts to playing for the first time
		 * @env Client | Server
		 * @event
		 */
		onStarted(): void

        /**
		 * returns an ArrayBuffer containing the raw sound data; soundName must already be loaded before calling this
		 * @env Client | Server
		 * @returns {ArrayBuffer} returns an ArrayBuffer containing the raw sound data; soundName must already be loaded before calling this
		 */
		getRawData(): ArrayBuffer

        /**
		 * called when the sound is manually resumed
		 * @env Client | Server
		 * @event
		 */
		onResumed(): void

        /**
		 * returns an AudioBuffer containing the useful data on the sound's buffer; the sound must already be loaded and playing
		 * @env Client | Server
		 * @returns {AudioBuffer} returns an AudioBuffer containing the useful data on the sound's buffer; the sound must already be loaded and playing
		 */
		getBuffer(): AudioBuffer

        /**
		 * name of the sound file associated with this sound object
		 * @env Client | Server
		 */
		soundName: string

        /**
		 * number of seconds to start playing the sound at
		 * @env Client | Server
		 */
		startTime: number

        /**
		 * turns looping on or off; if pLoop is not set, loop will be toggled
		 * @env Client | Server
		 * @param {unknown} [pLoop] - optional; true to loop, false to stop loop
		 */
		setLoop(pLoop?: unknown): void

        /**
		 * number between 0 and 100; volume of this sound object; default 100
		 * @env Client | Server
		 */
		volume: number

        /**
		 * returns an AudioContext containing the useful data on the sound's context; the sound must already be loaded and playing
		 * @env Client | Server
		 * @returns {AudioContext} returns an AudioContext containing the useful data on the sound's context; the sound must already be loaded and playing
		 */
		getContext(): AudioContext

        /**
		 * called when the sound is manually stopped
		 * @env Client | Server
		 * @event
		 */
		onStopped(): void

        /**
		 * if true sound loops; if false sound plays once
		 * @env Client | Server
		 */
		loop: boolean
                
	}
            
                
	
	/**The interface object.*/
	type Interface = {
                    
		/**
		 * shows the interface element
		 * @env Client | Server
		 */
		show(): void

        /**
		 * default false; if set this interface will not scale or move when the window changes size
		 * @env Client | Server
		 */
		preventAutoScale: boolean

        /**
		 * returns the name of the interface the interface object is part of
		 * @env Client | Server
		 * @returns {string} returns the name of the interface the interface object is part of
		 */
		getInterfaceName(): string

        /**
		 * default 0; number of pixels to offset the text by on the y-axis
		 * @env Client | Server
		 */
		textStyle: object

        /**
		 * executes any default commands or custom executed event of object
		 * @env Client | Server
		 * @param {Client} pClient - client to execute with
		 */
		execute(pClient: Client): void

        /**
		 * returns an object {'x': x,'y': y} containing the x and y positions of the interface element on the screen
		 * @env Client | Server
		 * @returns {{'x': number,'y': number}} returns an object {'x': x,'y': y} containing the x and y positions of the interface element on the screen
		 */
		getPos(): {'x': number,'y': number}

        /**
		 * string containing composite value that determines how this diob is drawn with other diobs on the same plane; possible values: source-over, source-atop, source-in, source-out, destination-over, destination-atop, destination-in, destination-out, lighter, copy, xor, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color, luminosity
		 * @env Client | Server
		 */
		composite: 'source-over' | 'source-atop' | 'source-in' | 'source-out' | 'destination-over' | 'destination-atop' | 'destination-in' | 'destination-out' | 'lighter' | 'copy' | 'xor' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity'

        /**
		 * returns the client this interface element belongs to, if there is one
		 * @env Client | Server
		 * @returns {void} returns the client this interface element belongs to, if there is one
		 */
		getClient(): void

        /**
		 * position on the y-axis from top to bottom of the interface element on the screen
		 * @env Client | Server
		 */
		yPos: number

        /**
		 * locks the interface element to an edge of the screen; only works if preventAutoScale is enabled; possible values: top, top-left, top-right, right, left, bottom, bottom-right, bottom-left
		 * @env Client | Server
		 */
		edgeLock: 'top' | 'top-left' | 'top-right' | 'right' | 'left' | 'bottom' | 'bottom-right' | 'bottom-left'

        /**
		 * type of interface; TextBox/CommandInput/TextInput/PassInput/WebBox/TextArea/Default
		 * @env Client | Server
		 */
		interfaceType: string

        /**
		 * moves the interface element to the specified screen location
		 * @env Client | Server
		 * @param {number} pX - position on the x-axis of the screen; from left to right
		 * @param {number} pY - position on the y-axis of the screen; from top to bottom
		 */
		setPos(pX: number, pY: number): void

        /**
		 * true if the interface is hidden; false otherwise
		 * @env Client | Server
		 */
		isHidden: boolean

        /**
		 * returns the DOM/HTML element attached to this interface element, if there is one; access `innerBox` to get the box that `text` is added to
		 * @env Client | Server
		 * @returns {void} returns the DOM/HTML element attached to this interface element, if there is one; access `innerBox` to get the box that `text` is added to
		 */
		getDOM(): void

        /**
		 * hides the interface element
		 * @env Client | Server
		 */
		hide(): void

        /**
		 * position on the x-axis from left to right of the interface element on the screen
		 * @env Client | Server
		 */
		xPos: number
		[key: string]: any
                
	}
            
                
	
	/**The client object.*/
	type Client = {
                    
		/**
		 * stores pData as a string locally on the client's computer and can be referenced using pKey; leaving pKey and pData blank will clear all local storage; 3000 characters are allowed to be saved per game (keys and values combined)
		 * @env Client | Server
		 * @param {unknown} pKey - key used to reference the stored data
		 * @param {unknown} pData - data as a string to store locally for the client
		 */
		setLocalStorage(pKey: unknown, pData: unknown): void

        /**
		 * returns an object {'x': x, 'y': y} containing the x and y position on the map that currently matches the pX and pY position on the screen
		 * @env Client | Server
		 * @param {number} pX - x position on the screen
		 * @param {number} pY - y position on the screen
		 * @param {object} [pO] - optional; an existing object to set the x and y of
		 * @returns {{'x': number, 'y': number}} returns an object {'x': x, 'y': y} containing the x and y position on the map that currently matches the pX and pY position on the screen
		 */
		getPosFromScreen(pX: number, pY: number, pO?: object): {'x': number, 'y': number}

        /**
		 * returns the interface element object of the specified interface
		 * @env Client | Server
		 * @param {string} pInterface - name of the interface to get element from
		 * @param {Diob} pElement - name of the element to get
		 * @returns {Diob} returns the interface element object of the specified interface
		 */
		getInterfaceElement(pInterface: string, pElement: Diob): Diob

        /**
		 * removes the specified filter
		 * @env Client | Server
		 * @param {string | number} pName - name of filter to remove
		 */
		removeFilter(pName: string | number): void

        /**
		 * sets the client's overlays to the array pOver
		 * @env Client | Server
		 * @param {Diob[]} pOver - array of overlays to set this client's overlays to
		 */
		setOverlays(pOver: Diob[]): void

        /**
		 * brings up a confirm window asking the user to select "yes" or "no"; returns true or false
		 * @env Client | Server
		 * @param {string} pMes - message to display in the confirm window
		 * @param {Function} pFunc - function to call after input; the first argument will be the input; can be a "callback array" containing the function, the 'this', and arguments; ex ( [this.someFunc, this] )
		 * @returns {void} returns true or false
		 */
		confirm(pMes: string, pFunc: Function): void

        /**
		 * amount of blank tiles that can be seen on the left and right of the view
		 * @env Client | Server
		 */
		xEdgeLimit: number

        /**
		 * performs the specified draw function using the specified pArgs object; ex ( {'type': 'image', 'image': this, 'x': 1, 'y': 1} )
		 * @env Client | Server
		 * @param {object | object[]} pArgs - an object or array of objects which determines the settings of the draw
		 * @param {string | number} pName - type of draw
		 */
		topScreenDraw(pArgs: object | object[], pName: string | number): void

        /**
		 * returns an object {'x': x, 'y': y} containing the x and y offsets of client's view eye
		 * @env Client | Server
		 * @returns {{'x': number, 'y': number}} returns an object {'x': x, 'y': y} containing the x and y offsets of client's view eye
		 */
		getViewEyeOffsets(): {'x': number, 'y': number}

        /**
		 * creates a new top screen named pName with the layer pLayer
		 * @env Client | Server
		 * @param {string | number} pName - name of the top screen to create
		 * @param {unknown} [pLayer] - optional; layer to give the screen
		 * @param {object} [pSet] - optional; settings object; ex ( {'scaleType': 'nearest'} );
		 */
		createTopScreen(pName: string | number, pLayer?: unknown, pSet?: object): void

        /**
		 * returns an object containing the x and y of the game scale; ex: {'x': 2, 'y': 2}
		 * @env Client | Server
		 * @param {object} [pO] - optional; an existing object to set the x and y of
		 * @returns {{'x': number, 'y': number}} returns an object containing the x and y of the game scale; ex: {'x': 2, 'y': 2}
		 */
		getScreenScale(pO?: object): {'x': number, 'y': number}

        /**
		 * ends movement of client.playerMob in the direction of pDir
		 * @env Client | Server
		 * @param {string} pDir - name of direction to stop moving the client's playerMob in; pDir being undefined ends all movement
		 */
		endMove(pDir: string): void

        /**
		 * returns the name of the account the client is logged in with
		 * @env Client | Server
		 * @returns {string} returns the name of the account the client is logged in with
		 */
		getAccountName(): string

        /**
		 * adds the specified filter
		 * @env Client | Server
		 * @param {string | number} pName - name of the filter; only one name may be used at a time, using the name will remove the old filter with that name
		 * @param {string} pType - the type of filter to add; below is the types and their specific possible pArgs values
		 * @param {unknown} pArgs - color-based filter
		 */
		addFilter(pName: string | number, pType: string, pArgs: unknown): void

        /**
		 * removes the client command from the client's commands
		 * @env Client | Server
		 * @param {string} pCommand - name of the client command to remove
		 */
		removeCommand(pCommand: string): void

        /**
		 * sets the background of the client's screen background
		 * @env Client | Server
		 * @param {string} pBack - string containing a color, for example '#000' for black
		 */
		setScreenBackground(pBack: string): void

        /**
		 * sets the client's max FPS to pFPS
		 * @env Client | Server
		 * @param {unknown} pFPS - cap the amount the FPS the client will try to reach when drawing the screen; default 60
		 */
		setMaxFPS(pFPS: unknown): void

        /**
		 * returns a reference to the web tag with the id pID
		 * @env Client | Server
		 * @param {string} pID - id of the web tag
		 * @returns {HTMLElement} returns a reference to the web tag with the id pID
		 */
		getWebTag(pID: string): HTMLElement

        /**
		 * sets the style of pStyle to the value of pValue of the web tag with the id pID
		 * @env Client | Server
		 * @param {string} pID - id of the web tag to set the style of
		 * @param {unknown} pStyle - type of style to set
		 * @param {string} pValue - value as a string to set the style to
		 */
		setWebTagStyle(pID: string, pStyle: unknown, pValue: string): void

        /**
		 * sets the HTML of the web box behind the game screen
		 * @env Client | Server
		 * @param {string} pBack - string containing HTML to set use in the web box behind the game screen
		 */
		setWebBackground(pBack: string): void

        /**
		 * clears all the keys the client is holding and calls their key up events; if the client continues to hold the key and once the user manually releases the key, the key event may still continue to trigger, so take that into consideration
		 * @env Client | Server
		 */
		clearKeyDownEvents(): void

        /**
		 * focuses on the interface element object
		 * @env Client | Server
		 */
		setFocus(): void

        /**
		 * sets the variable pVar to pVal for the plane pPlane
		 * @env Client | Server
		 * @param {number} pPlane - value of plane to set
		 * @param {string} pVar - string containing name of variable to set
		 * @param {boolean} pVal - value to give this plane's pVar variable
		 */
		setPlane(pPlane: number, pVar: string, pVal: boolean): void

        /**
		 * sets the client's view eye offsets
		 * @env Client | Server
		 * @param {number} pX - amount of pixels for the screen to be offset from the client's view eye on the x-axis
		 * @param {number} pY - amount of pixels for the screen to be offset from the client's view eye on the y-axis
		 */
		setViewEyeOffsets(pX: number, pY: number): void

        /**
		 * plays a sound to this client; returns the Sound object
		 * @env Client | Server
		 * @param {string | {'soundName': string, 'volume': number}} pSound - either a string with the name of a sound file, or a string containing the path of a Sound object, or an actual Sound object, or a basic object with the proper information; ex ( {'soundName': 'name', 'volume': 50} )
		 * @param {unknown} [pStart] - optional; time to start playing the sound at
		 * @param {unknown} [pDuration] - optional; how long to play the sound for
		 * @returns {void} returns the Sound object
		 */
		playSound(pSound: string | {'soundName': string, 'volume': number}, pStart?: unknown, pDuration?: unknown): void

        /**
		 * gets the data as a string that is stored with the key pKey on the client's computer
		 * @env Client | Server
		 * @param {unknown} pKey - key used to get data stored locally on the client's computer
		 */
		getLocalStorage(pKey: unknown): Storage

        /**
		 * executes the event pEvent of the web tag with the id pID
		 * @env Client | Server
		 * @param {string} pID - id of the web tag to call the event of
		 * @param {unknown} pEvent - name of the event to call; onMouseDown, onMouseUp, onMouseClick, onMouseDblClick, onMouseMove
		 */
		callWebTagEvent(pID: string, pEvent: unknown): void

        /**
		 * returns an array of names of all created interfaces
		 * @env Client | Server
		 * @returns {string[]} returns an array of names of all created interfaces
		 */
		getInterfaceNames(): string[]

        /**
		 * removes the script with the pName name from the game
		 * @env Client | Server
		 * @param {string | number} pName - name of script to remove
		 */
		removeWebScript(pName: string | number): void

        /**
		 * loads a JavaScript file into the project
		 * @env Client | Server
		 * @param {string | number} pName - name to give the script
		 * @param {unknown} pLink - link to the JavaScript file to load
		 * @param {unknown} [pModule] - optional; load script as a module
		 * @param {Function} [pFunc] - optional; function to call after the JavaScript file has loaded
		 */
		addWebScript(pName: string | number, pLink: unknown, pModule?: unknown, pFunc?: Function): void

        /**
		 * a string containing the HTML to display behind the game screen; #web_background to set the style of the entire background
		 * @env Client | Server
		 */
		webBackground: string

        /**
		 * sets the client's screenView to pView or default if pView is null
		 * @env Client | Server
		 * @param {object} pView - an object containing new information for the client's screenView; for example {'scaleTo': 'ratio', 'scaleNearest': true} would mean the client's screenView keeps its ratio and scales pixels to their nearest neighbor; 'scaleNearest' means pixels will stay pixelated and will not try to blend with other pixels, 'scaleTo': 'normal' means normal scaling, 'scaleTo': 'ratio' means the width and height of the window keep their aspect ratio when scaled, 'scaleTo': 'multiple' means the game will only show in scales that are multiples of two when scaled, 'scaleTo': 'none' prevents all scaling
		 */
		setScreenView(pView: object): void

        /**
		 * returns an object containing the cursor information; ex ( {'cursor': 'default', 'x': 0, 'y': 0} )
		 * @env Client | Server
		 * @returns {{'cursor': string, 'x': number, 'y': number}} returns an object containing the cursor information; ex ( {'cursor': 'default', 'x': 0, 'y': 0} )
		 */
		getMouseCursor(): {'cursor': string, 'x': number, 'y': number}

        /**
		 * returns a screenView object containing the information of the client's screenView; for example {'scaleTo': 'ratio', 'scaleNearest': true} would mean the client's screenView keeps its ratio and scales pixels to their nearest neighbor
		 * @env Client | Server
		 * @returns {object} returns a screenView object containing the information of the client's screenView; for example {'scaleTo': 'ratio', 'scaleNearest': true} would mean the client's screenView keeps its ratio and scales pixels to their nearest neighbor
		 */
		getScreenView(): object

        /**
		 * calls the client command of pCommand with the arguments of pArgs
		 * @env Client
		 * @param {string} pCommand - name of the client command to call
		 * @param {unknown[]} pArgs - array of arguments to pass to the command
		 * @param {unknown} [pSend] - CLIENT-ONLY; optional; if set the command will also be sent to the server
		 */
		callCommand(pCommand: string, pArgs: unknown[], pSend?: unknown): void

        /**
		 * name of the interface element to send default messages to (ex: 'interface1.output1' )
		 * @env Client | Server
		 */
		mainOutput: string

        /**
		 * sets the focus on the web tag with the id pID
		 * @env Client | Server
		 * @param {string} pID - id of the web tag to set focus to
		 */
		setWebTagFocus(pID: string): void

        /**
		 * hides the interface of pInterface if pElement is not specified, otherwise it only hides pElement
		 * @env Client | Server
		 * @param {string} pInterface - name of the interface to hide or the interface containing pElement
		 * @param {Diob} [pElement] - optional; name of interface lement in pInterface to hide
		 */
		hideInterface(pInterface: string, pElement?: Diob): void

        /**
		 * returns a mapView object containing the information of the client's mapView; for example {'width': 640, 'height': 640} would mean the client's mapView is 640 by 640 pixels in size
		 * @env Client | Server
		 * @returns {object} returns a mapView object containing the information of the client's mapView; for example {'width': 640, 'height': 640} would mean the client's mapView is 640 by 640 pixels in size
		 */
		getMapView(): object

        /**
		 * toggles load screen on and off
		 * @env Client | Server
		 * @param {boolean} [pVal] - optional; true to show load screen, false to hide load screen
		 */
		toggleLoadScreen(pVal?: boolean): void

        /**
		 * toggles macro capturing on and off
		 * @env Client | Server
		 * @param {boolean} [pVal] - optional; true to resume capturing macros, false to pause capturing macros
		 */
		toggleMacroCapture(pVal?: boolean): void

        /**
		 * removes a web tag with the id of pID from the client's screen
		 * @env Client | Server
		 * @param {string} pID - id of the web tag to remove from the client's screen
		 */
		removeWebTag(pID: string): void

        /**
		 * sets the view eye of the client to be centered on pDiob; the default is the player mob
		 * @env Client | Server
		 * @param {Diob} pDiob - diob to have the client's screen view centered on
		 */
		setViewEye(pDiob: Diob): void

        /**
		 * returns an object containing the width and height of the game window; ex: {'width': 100, 'height': 100}
		 * @env Client | Server
		 * @param {object} [pO] - optional; an existing object to set the width and height of
		 * @returns {{'width': number, 'height': number}} returns an object containing the width and height of the game window; ex: {'width': 100, 'height': 100}
		 */
		getWindowSize(pO?: object): {'width': number, 'height': number}

        /**
		 * SERVER-ONLY; setting this will prevent the server from automatically loading interfaces on the server-side; if you want the server to have access, you will need to show the interface manually
		 * @env Server
		 */
		preventServerInterfaces: boolean

        /**
		 * adds a new command to the client's commands; if pFunc is null and pCommand is the name of an pre-defined command, that command will be added
		 * @env Client | Server
		 * @param {string} pCommand - name of the client command to be added
		 * @param {Function} pFunc - function to be called when the command is executed
		 */
		addCommand(pCommand: string, pFunc: Function): void

        /**
		 * sets the client's mainOutput
		 * @env Client | Server
		 * @param {string} pOutput - name of the interface element to send default messages to (ex: 'interface1.output1' )
		 */
		setMainOutput(pOutput: string): void

        /**
		 * creates a new custom macro named pName with the keyDown command of pDown and the keyUp command of pUp; custom macros override macro atlas macros
		 * @env Client | Server
		 * @param {string | number} pName - name of the custom macro
		 * @param {string} pKey - string of key that will execute the macro
		 * @param {string} [pDown] - optional; string containing the command to be executed when the key is pushed down; example 'test(1)' would execute the 'test' client command with one parameter equal to '1'
		 * @param {string} [pUp] - optional; string containing the command to be executed when the key is let go of; example 'test(1)' would execute the 'test' client command with one parameter equal to '1'
		 */
		addCustomMacro(pName: string | number, pKey: string, pDown?: string, pUp?: string): void

        /**
		 * returns an object containing information about the client's browser and operating system; example {'platform': 'Netscape', 'version': 'Chrome/38.0.2125.104', 'vendor': 'Google', 'language': 'en-US', 'system': 'Windows 95'}
		 * @env Client | Server
		 * @returns {Navigator} returns an object containing information about the client's browser and operating system; example {'platform': 'Netscape', 'version': 'Chrome/38.0.2125.104', 'vendor': 'Google', 'language': 'en-US', 'system': 'Windows 95'}
		 */
		getNavigator(): Navigator

        /**
		 * true or false; true acts the same as 'scaleNearest' when scaling, but it also removes smoothing caused by other things
		 * @env Client | Server
		 */
		screenView: unknown

        /**
		 * displays the interface of pInterface, if not already displayed, along with all elements of the interface with that are not hidden by default; if pElement is specified, it makes that element no longer hidden
		 * @env Client | Server
		 * @param {string} pInterface - name of interface to show
		 * @param {Diob} [pElement] - optional; name of interface element in pInterface to show
		 * @param {boolean} [pForce] - optional; if set, all hidden elements will be forced to be shown
		 */
		showInterface(pInterface: string, pElement?: Diob, pForce?: boolean): void

        /**
		 * moves the client.playerMob in the direction pDir until told to stop via endMove(pDir)
		 * @env Client | Server
		 * @param {string} pDir - name of direction to move client.playerMob
		 */
		startMove(pDir: string): void

        /**
		 * a string containing the address the client is connected to the server with (in format IP:port, or 'localhost' if not connected to a server)
		 * @env Client | Server
		 */
		address: string

        /**
		 * string containing CSS to be used as a web style (ex '.test{font-weight: bold;}.test2{color: #000;}' ); style can be referenced by the name 'default'
		 * @env Client | Server
		 */
		mainWebStyle: string

        /**
		 * returns the canvas element that this element is drawn on to
		 * @env Client | Server
		 * @param {unknown} pInt - name of the interface that element is on
		 * @param {unknown} pEl - name of the element
		 * @returns {HTMLCanvasElement} returns the canvas element that this element is drawn on to
		 */
		getInterfaceCanvas(pInt: unknown, pEl: unknown): HTMLCanvasElement

        /**
		 * adds a custom font
		 * @env Client | Server
		 * @param {string | number} pName - name of the font
		 * @param {string} pPath - url or path to the font file
		 * @param {unknown} [pRemote] - optional; set this if the path is outside of the project
		 * @param {object} [pStyle] - optional; custom style object to apply to the font; ex {'font-weight': bold}
		 */
		addCustomFont(pName: string | number, pPath: string, pRemote?: unknown, pStyle?: object): void

        /**
		 * sends a packet to a client or server, depending on where the code is executed; client code executing this will send the packet to the server; server code executing this will send the packet to the client; this will invoke Client/onPacket on client-side if the sendPacket is server-side and on the server-side if it is on the client-side
		 * @env Client | Server
		 * @param {string | number} pName - name of packet to send
		 * @param {unknown} pData - an object containing data to be sent; ex {'a': 1, 'b': 2}
		 * @param {boolean} [pForce] - optional; send the packet immediately instead of buffering it with the packet delay
		 */
		sendPacket(pName: string | number, pData: unknown, pForce?: boolean): void

        /**
		 * toggles screen drawing on and off
		 * @env Client | Server
		 * @param {boolean} [pVal] - optional; true to resume screen drawing, false to pause all screen drawing, 'map' to pause only the map drawing
		 */
		toggleScreenDrawing(pVal?: boolean): void

        /**
		 * removes all overlays with the pOver type or the exact overlay matching pOver
		 * @env Client | Server
		 * @param {string | Diob | Object} pOver - string of the type of object or overlay to remove or actual overlay to remove
		 */
		removeOverlay(pOver: string | Diob | Object): void

        /**
		 * adds an interface element to the interface and returns it
		 * @env Client | Server
		 * @param {string} pType - type of interface object to add
		 * @param {string} pInterface - name of the interface to add the interface element to
		 * @param {string | number} [pName] - optional; name to give the element being added
		 * @param {number} [pX] - optional; x position to give the element
		 * @param {number} [pY] - optional; y position to the give the element
		 * @param {unknown[]} [pArgs] - optional; array of arguments to pass to the onNew event of the interface element being created
		 * @returns {Diob} returns it
		 */
		addInterfaceElement(pType: string, pInterface: string, pName?: string | number, pX?: number, pY?: number, pArgs?: unknown[]): Diob

        /**
		 * sets the content of the web tag with the id pID to the value of pContent
		 * @env Client | Server
		 * @param {string} pID - id of the web tag to set the content of
		 * @param {string} pContent - string containing the content to change the web tag's content to
		 */
		setWebTagContent(pID: string, pContent: string): void

        /**
		 * amount of pixels the client's view is offset by from the view eye on the y-axis
		 * @env Client | Server
		 */
		yViewEyeOffset: number

        /**
		 * a reference to the player mob of this client
		 * @env Client | Server
		 */
		mob: Diob

        /**
		 * brings up an alert window with pMes in it
		 * @env Client | Server
		 * @param {string} pMes - message to show in the alert
		 */
		alert(pMes: string): void

        /**
		 * returns the current FPS
		 * @env Client | Server
		 * @returns {number} returns the current FPS
		 */
		getFPS(): number

        /**
		 * set in order to tell the engine the client is in an input and key commands should be used as text input, false for normal; engine automatically sets this for most inputs
		 * @env Client | Server
		 */
		inInput: boolean

        /**
		 * returns the diob the client's screen eye is currently set to
		 * @env Client | Server
		 * @returns {Diob} returns the diob the client's screen eye is currently set to
		 */
		getViewEye(): Diob

        /**
		 * moves the client to a new server located at the address pAddress
		 * @env Client | Server
		 * @param {unknown} pAddres - address for the server to move the client to; example '127.0.0.1:1234'
		 */
		changeServer(pAddres: unknown): void

        /**
		 * returns an array of interface elements on the interface pInterface depending on the provided arguments; if pType is not set, all elements on the interface will be returned; if pType is set but pChild is not, elements on the interface with the exact type of pType will be returned; if pType is set and pChild is set, all elements with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Interface/A' with pChild undefined, all elements with the exact type of 'Interface/A' will be returned, but if pChild is set, then all types starting with 'Interface/A' on the interface will be returned
		 * @env Client | Server
		 * @param {string} pInterface - name of the interface to get element from
		 * @param {string} [pType] - optional; string containing type path to return
		 * @param {boolean} [pChild] - optional; boolean that determines if child types are included
		 * @returns {Diob[]} returns an array of interface elements on the interface pInterface depending on the provided arguments; if pType is not set, all elements on the interface will be returned; if pType is set but pChild is not, elements on the interface with the exact type of pType will be returned; if pType is set and pChild is set, all elements with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Interface/A' with pChild undefined, all elements with the exact type of 'Interface/A' will be returned, but if pChild is set, then all types starting with 'Interface/A' on the interface will be returned
		 */
		getInterfaceElements(pInterface: string, pType?: string, pChild?: boolean): Diob[]

        /**
		 * returns the content of the web tag with the id of pID
		 * @env Client | Server
		 * @param {string} pID - id of the web tag to get the content of
		 * @returns {string} returns the content of the web tag with the id of pID
		 */
		getWebTagContent(pID: string): string

        /**
		 * changes the name and layer of the top screen with the name pName; adding data optional
		 * @env Client | Server
		 * @param {string | number} pName - name of the top screen to set
		 * @param {unknown} pNewName - new name of the top screen
		 * @param {unknown} pNewLayer - new layer of the top screen
		 * @param {unknown} [pNewData] - optional; data to add to the screen
		 * @param {unknown} [pNewSet] - optional; new settings object
		 */
		setTopScreen(pName: string | number, pNewName: unknown, pNewLayer: unknown, pNewData?: unknown, pNewSet?: unknown): void

        /**
		 * sets the edge limit of the map for the client
		 * @env Client | Server
		 * @param {number} pX - number of black tiles visible on the left and right edges of the map; -1 for default
		 * @param {number} pY - number of black tiles visible on the top and bottom edges of the map; -1 for default
		 */
		setEdgeLimit(pX: number, pY: number): void

        /**
		 * sets the client's mapView to pView or default if pView is null
		 * @env Client | Server
		 * @param {object} pView - an object containing new information for the client's mapView; for example {'width': 640, 'height': 640} would set the client's mapView to 640 by 640 pixels
		 */
		setMapView(pView: object): void

        /**
		 * brings up a prompt window to ask for text from the user
		 * @env Client | Server
		 * @param {unknown} pTitle - title of the prompt
		 * @param {string} pMes - default text in the input
		 * @param {Function} pFunc - function to call after input; the first argument will be the input; can be a "callback array" containing the function, the 'this', and arguments; ex ( [this.someFunc, this] )
		 */
		prompt(pTitle: unknown, pMes: string, pFunc: Function): void

        /**
		 * amount of pixels the client's view is offset by from the view eye on the x-axis
		 * @env Client | Server
		 */
		xViewEyeOffset: number

        /**
		 * returns true if pInt is currently shown, false if not; if pEl is set, checks if the specified element is shown
		 * @env Client | Server
		 * @param {unknown} pInt - name of the interface
		 * @param {unknown} [pEl] - optional; name of the element
		 * @returns {boolean} returns true if pInt is currently shown, false if not; if pEl is set, checks if the specified element is shown
		 */
		checkInterfaceShown(pInt: unknown, pEl?: unknown): boolean

        /**
		 * outputs text to an interface element; if pInt or pEl is not set or is invalid, text goes to client.mainOutput
		 * @env Client | Server
		 * @param {string} pText - text to be displayed
		 * @param {string} pInt - string containing interface file name to output to
		 * @param {string} pEl - string containing the interface element name to output to
		 */
		outputText(pText: string, pInt: string, pEl: string): void

        /**
		 * returns an array of diobs on the screen that overlap the specified position box depending on the provided arguments; if pType is not set, all diobs in the position box will be returned; if pType is set but pChild is not, diobs in the position box with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Interface' with pChild undefined, all diobs with the exact type of 'Interface' will be returned, but if pChild is set, then all interfaces on the screen will be returned
		 * @env Client | Server
		 * @param {number} pX - starting x position
		 * @param {number} pY - starting y position
		 * @param {string} [pType] - optional; ending x position
		 * @param {boolean} [pChild] - optional; ending y position
		 * @param {string} [pPage] - optional; string containing type path to return
		 * @returns {Diob[]} returns an array of diobs on the screen that overlap the specified position box depending on the provided arguments; if pType is not set, all diobs in the position box will be returned; if pType is set but pChild is not, diobs in the position box with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Interface' with pChild undefined, all diobs with the exact type of 'Interface' will be returned, but if pChild is set, then all interfaces on the screen will be returned
		 */
		getInterfaceElementsFromScreen(pX: number, pY: number, pType?: string, pChild?: boolean, pPage?: string): Diob[]

        /**
		 * removes a font from being usable
		 * @env Client | Server
		 * @param {string | number} pName - name of the font to remove
		 */
		removeCustomFont(pName: string | number): void

        /**
		 * string containing a color (null for transparent) to set the client's screen background to, for example '#000' for black; default is '#000'
		 * @env Client | Server
		 */
		screenBackground: string | null

        /**
		 * adds an overlay to the client which is a visual icon that always follows the screen; returns the new overlay; if pOver is already an overlay of a diob it will remove it form that diob and add it to this diob
		 * @env Client | Server
		 * @param {string | Diob | Object} pOver - string of the type of object or overlay to add an overlay of or actual diob to add
		 * @param {number | boolean} [pAppearance] - optional; if true, this overlay will be be treated as if it is part of the the parent's actual appearance - appearance settings such as angle and alpha of the parent will be used for this overlay and the overlay will be drawn directly on top of the parent so no other diobs that are not an overlay of the parent can appear between it and the parent (it will basically be an extension of the parent's icon); if this is false, the overlay will be treated as an independent diob that just follows the parent around; instead of true or false this can be an object containing information on the appearMask, 'shareIcon' to have the overlay share the same iconName as the parent and 'isUnder' to make the overlay appear under the parent instead of above, 'ownState' to have this overlay not sync up with the parent's iconState; ex {'shareIcon': true, 'isUnder': true}
		 * @param {boolean} [pSkipEvent] - optional; if true, the onAddOverlay event will not be called
		 * @returns {Diob} returns the new overlay; if pOver is already an overlay of a diob it will remove it form that diob and add it to this diob
		 */
		addOverlay(pOver: string | Diob | Object, pAppearance?: number | boolean, pSkipEvent?: boolean): Diob

        /**
		 * changes the macro file the client uses
		 * @env Client | Server
		 * @param {string} pMacro - name of macro file to set client macros to
		 */
		setMacroAtlas(pMacro: string): void

        /**
		 * grabs an object with the screen name, layer, settings, and either an array of pixel data or a data url depending on pType for the entire screen named pName or the default top screen if no name is given. The array of pixel data can then be changed and used elsewhere or drawn onto another screen. To read the width and height you could use object.width and object.height, where object is the object returned by the function. The object data array is as follows: object.data[0] is the red value (0-255) of the pixel at 0,0, object.data[1] is the green value (0-255) of the pixel at 0,0, object.data[2] is the blue value (0-255) of the pixel at 0,0, and object.data[3] is the alpha value (0-255) of the pixel at 0,0. Then object.data[4], object.data[5], object.data[6], and object.data[7] are the respective values for the pixel at 1,0. This trend continues through the whole array for every pixel. object ex: {'name': '', 'layer': 1, 'data': ''}
		 * @env Client | Server
		 * @param {string | number} [pName] - optional; name of the top screen to get the data of
		 * @param {string} [pType] - optional; type of data to get; 'url' or 'pixels' or 'canvas'
		 */
		getTopScreen(pName?: string | number, pType?: string): void

        /**
		 * sets the cursor of the client
		 * @env Client | Server
		 * @param {string} pCursor - a string containing the name of the cursor for built-in cursors, a URL path to an image, or a diob; built-in (auto, all-scroll, crosshair, default, help, inherit, move, pointer, progress, text, vertical-text, wait, no-drop, not-allowed, e-resize, n-resize, s-resize, w-resize, col-resize, row-resize, ne-resize, nw-resize, se-resize, sw-resize); passing a diob will use the diob's icon; blank for default
		 * @param {number} [pX] - optional; offsets the icon left or right by pX pixels
		 * @param {number} [pY] - optional; offsets the icon up or down by pY pixels
		 */
		setMouseCursor(pCursor: string, pX?: number, pY?: number): void

        /**
		 * maximum number of frames the client will attempt to draw per second; default 60
		 * @env Client | Server
		 */
		maxFPS: number

        /**
		 * removes a CSS style with the name pName
		 * @env Client | Server
		 * @param {string | number} pName - unique name of style
		 */
		removeWebStyle(pName: string | number): void

        /**
		 * returns an object {'step': step, 'max': {'x': x, 'y': y}} containing delay details of client's view eye
		 * @env Client | Server
		 * @returns {{'step': number, 'max': {'x': number, 'y': number}}} returns an object {'step': step, 'max': {'x': x, 'y': y}} containing delay details of client's view eye
		 */
		getViewEyeDelay(): {'step': number, 'max': {'x': number, 'y': number}}

        /**
		 * returns address of the client, 'localhost' for local or 'ip:port' if connected to a server
		 * @env Client | Server
		 * @returns {string} returns address of the client, 'localhost' for local or 'ip:port' if connected to a server
		 */
		getAddress(): string

        /**
		 * returns an array of custom macro names
		 * @env Client | Server
		 * @returns {string[]} returns an array of custom macro names
		 */
		getCustomMacroNames(): string[]

        /**
		 * returns an object {'x': x, 'y': y} containing the x and y position of the client's screen on the map
		 * @env Client | Server
		 * @param {object} [pO] - optional; an existing object to set the x and y of
		 * @returns {{'x': number, 'y': number}} returns an object {'x': x, 'y': y} containing the x and y position of the client's screen on the map
		 */
		getScreenPos(pO?: object): {'x': number, 'y': number}

        /**
		 * evaluates the JavaScript code in the pScript string; returns undefined on the server-side
		 * @env Client | Server
		 * @param {string} pScript - a string containing the JavaScript code to evaluate
		 * @returns {void} returns undefined on the server-side
		 */
		evalWebScript(pScript: string): void

        /**
		 * amount of blank tiles that can be seen on the top and bottom of the view
		 * @env Client | Server
		 */
		yEdgeLimit: number

        /**
		 * returns an object containing the mouse position; ex ( {'x': 0, 'y': 0} )
		 * @env Client | Server
		 * @returns {{'x': number, 'y': number}} returns an object containing the mouse position; ex ( {'x': 0, 'y': 0} )
		 */
		getMousePos(): {'x': number, 'y': number}

        /**
		 * returns object currently being focused by this client
		 * @env Client | Server
		 * @returns {object} returns object currently being focused by this client
		 */
		getFocus(): object

        /**
		 * returns the diob plane pPlane ir specified, otherwise returns an array of existing planes; you can then alter it like any other diob and all visual changes will be applied to all diobs on this plane
		 * @env Client | Server
		 * @param {number} [pPlane] - optional; value of plane to get
		 * @returns {Diob | Diob[]} returns the diob plane pPlane ir specified, otherwise returns an array of existing planes; you can then alter it like any other diob and all visual changes will be applied to all diobs on this plane
		 */
		getPlane(pPlane?: number): Diob | Diob[]

        /**
		 * sets the client's game screen size to pWidth width and pHeight height
		 * @env Client | Server
		 * @param {number} pWidth - width as a number
		 * @param {number} pHeight - height as a number
		 */
		setScreenSize(pWidth: number, pHeight: number): void

        /**
		 * returns an array of filter names
		 * @env Client | Server
		 * @returns {string[]} returns an array of filter names
		 */
		getFilters(): string[]

        /**
		 * sets the client's view eye delay which is how many pixels the screen can be off center of the view eye and how quickly it catches up to the view eye; set step to 0 for no delay (the default)
		 * @env Client | Server
		 * @param {number} pDelay - object containing eye delay information; possible values 'step' (determines number of pixels the eye moves per frame; default 0) and 'max' (object determining maximum distance in pixels the screen can be from the eye {'x': 100, 'y': 100}); ex {'step': 2, 'max': {'x': 100, 'y': 100}}
		 */
		setViewEyeDelay(pDelay: number): void

        /**
		 * removes an interface element from the interface
		 * @env Client | Server
		 * @param {string} pInterface - name of the interface to remove an interface element from
		 * @param {string | number} pName - name of the interface element to remove
		 */
		removeInterfaceElement(pInterface: string, pName: string | number): void

        /**
		 * returns an object containing the width and height of the game screen; ex: {'width': 100, 'height': 100}
		 * @env Client | Server
		 * @param {object} [pO] - optional; an existing object to set the width and height of
		 * @returns {{'width': number, 'height': number}} returns an object containing the width and height of the game screen; ex: {'width': 100, 'height': 100}
		 */
		getScreenSize(pO?: object): {'width': number, 'height': number}

        /**
		 * hex, rgb, rgba, color matrix value, or a tint object; applies color filter to diob; ex ( '#000000' ); ex ( 'rgb(10, 20, 30)' ); ex ( {'tint': 0x444444} )
		 * @env Client | Server
		 */
		color: string | number[] | {'tint': number}

        /**
		 * creates a new interface file named pName
		 * @env Client | Server
		 * @param {string | number} pName - name of the interface to create
		 */
		createInterface(pName: string | number): void

        /**
		 * sends the data for the pD diob to the client, if pVar is set it will send only those variables, if it is not set it will only send built-in engine variables
		 * @env Server
		 * @param {Diob} pD - reference to the diob to send
		 * @param {unknown[]} [pVar] - optional; variable name or array of variable names
		 */
		sendDiob(pD: Diob, pVar?: unknown[]): void

        /**
		 * adds CSS style
		 * @env Client | Server
		 * @param {string | number} pName - unique name of style
		 * @param {unknown} pStyle - text as CSS to add to the client
		 */
		addWebStyle(pName: string | number, pStyle: unknown): void

        /**
		 * removes the custom macro pName from the client's custom macros
		 * @env Client | Server
		 * @param {string | number} pName - name of the custom macro
		 */
		removeCustomMacro(pName: string | number): void

        /**
		 * object containing eye delay information; possible values 'step' (determines number of pixels the eye moves per frame; default 1) and 'max' (object determining maximum distance in pixels the screen can be from the eye {'x': 100, 'y': 100}); ex {'step': 2, 'max': {'x': 100, 'y': 100}}
		 * @env Client | Server
		 */
		viewEyeDelay: {'step': number, 'max': {'x': number, 'y': number}}

        /**
		 * sets the client's playerMob to pMob
		 * @env Client | Server
		 * @param {Diob} pMob - reference to a Mob diob to give this client control of
		 */
		setPlayerMob(pMob: Diob): void

        /**
		 * returns an array of diobs that are overlays of this diob using the provided arguments; if pType is not set, all diobs will be returned; if pType is set but pChild is not, all diobs with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs will be returned
		 * @env Client | Server
		 * @param {string} [pType] - optional; string containing type path to return
		 * @param {boolean} [pChild] - optional; boolean that determines if child types are included
		 * @returns {Diob[]} returns an array of diobs that are overlays of this diob using the provided arguments; if pType is not set, all diobs will be returned; if pType is set but pChild is not, all diobs with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs will be returned
		 */
		getOverlays(pType?: string, pChild?: boolean): Diob[]

        /**
		 * optional; if set, the map will not scale based on the window size
		 * @env Client | Server
		 */
		mapView: object
		[key: string]: any
                
	}
            
                
	
	/**The resource object.*/
	type Resource = {
                    
		/**
		 * sets a game resource to use the resource file located at pPath
		 * @env Client | Server
		 * @param {string} pType - type of file to set
		 * @param {string | number} pName - name of file to set; this will be referenced in the project; example if pName was set to 'my_atlas' ( atlasName = 'my_atlas' )
		 * @param {string} pPath - path to the file; if not a remote file this will be the name of the file (or path if any sub directories were added) inside resources/files/ for the game, otherwise it will be a web URL path to the file
		 * @param {unknown} [pRemote] - optional; if set the pPath file will be treated like a web URL
		 */
		setResource(pType: string, pName: string | number, pPath: string, pRemote?: unknown): void

        /**
		 * returns the direct path to the resource
		 * @env Client | Server
		 * @param {string} pType - type of file to get
		 * @param {string | number} pName - name of file to get
		 * @returns {string} returns the direct path to the resource
		 */
		getResourcePath(pType: string, pName: string | number): string

        /**
		 * loads the resource of type pType with the name pName and then calls the function pFunc
		 * @env Client | Server
		 * @param {string} pType - type of file to load
		 * @param {string | number} pName - name of file to load
		 * @param {Function} pFunc - function to call after the resource has finished loading or failed to load
		 */
		loadResource(pType: string, pName: string | number, pFunc: Function): void

        /**
		 * returns a string containing the text inside of a loaded non-VS text file; the file must already be loaded to get the text
		 * @env Client | Server
		 * @param {string | number} pName - name of loaded file to get text of
		 * @returns {string} returns a string containing the text inside of a loaded non-VS text file; the file must already be loaded to get the text
		 */
		getFileText(pName: string | number): string
                
	}
            
                
	
	/**The util object.*/
	type Util = {
                    
		/**
		 * returns pVal converted to a float number
		 * @env Client | Server
		 * @param {boolean} pVal - value to get number from
		 * @returns {number} returns pVal converted to a float number
		 */
		parseFloat(pVal: boolean): number

        /**
		 * unzips gzipped data and returns the unzipped data
		 * @env Client | Server
		 * @param {unknown} pData - gzipped data
		 * @returns {string} returns the unzipped data
		 */
		gzUnzip(pData: unknown): string

        /**
		 * returns a string containing the type of variable
		 * @env Client | Server
		 * @param {unknown} pVar - variable to check
		 * @returns {string} returns a string containing the type of variable
		 */
		getVariableType(pVar: unknown): string

        /**
		 * handles either a stored callback function or a "callback array" and returns the results
		 * @env Client | Server
		 * @param {[Function, this: Diob | Object, [arg1: unknown, arg2: unknown]]} [pCallback] - reference to a function or a "callback array" which contains the reference to the callback function, followed by the call owner (the `this` of the function call), then an optional array of arguments; ex ( [this.func, this, [arg1, arg2]] )
		 * @returns {void} returns the results
		 */
		handleCallback(pCallback?: [Function, this: Diob | Object, [arg1: unknown, arg2: unknown]]): void

        /**
		 * converts pRad into degrees and returns the number
		 * @env Client | Server
		 * @param {unknown} pRad - radians to convert
		 * @returns {number} returns the number
		 */
		toDegrees(pRad: unknown): number

        /**
		 * returns pVal converted to a number value
		 * @env Client | Server
		 * @param {boolean} pVal - value to get number from
		 * @returns {number} returns pVal converted to a number value
		 */
		toNumber(pVal: boolean): number

        /**
		 * creates an object from pString and returns it if the string is a valid object format
		 * @env Client | Server
		 * @param {string} pString - string to create an object from; ex ( "{'name': 'test', 'value1': 1}" )
		 * @returns {object | undefined} returns it if the string is a valid object format
		 */
		stringToObject(pString: string): object | undefined

        /**
		 * returns new text that has been encoded to make it a valid URI component
		 * @env Client | Server
		 * @param {string} pText - text to encode
		 * @returns {string} returns new text that has been encoded to make it a valid URI component
		 */
		encodeURIComponent(pText: string): string

        /**
		 * returns true if value is a string; returns false if value is not a string
		 * @env Client | Server
		 * @param {boolean} pVal - value to check for string
		 * @returns {string} returns true if value is a string; returns false if value is not a string
		 */
		isString(pVal: boolean): string

        /**
		 * returns true if value is an object; returns false if value is not an object
		 * @env Client | Server
		 * @param {boolean} pVal - value to check for object
		 * @returns {boolean} returns true if value is an object; returns false if value is not an object
		 */
		isObject(pVal: boolean): boolean

        /**
		 * text to encode HTML tags of
		 * @env Client | Server
		 * @param {string} pText - text to encode HTML tags of
		 * @returns {string} returns a new text with HTML tags encoded; '<' becomes '&amp;lt;', '>' becomes '&amp;gt;', '/' becomes '&amp;#47;'
		 */
		encodeWebTags(pText: string): string

        /**
		 * returns new text that has been decoded
		 * @env Client | Server
		 * @param {string} pText - text to decode
		 * @returns {string} returns new text that has been decoded
		 */
		decodeURI(pText: string): string

        /**
		 * converts pDeg into radians and returns the number
		 * @env Client | Server
		 * @param {unknown} pDeg - degrees to convert
		 * @returns {number} returns the number
		 */
		toRadians(pDeg: unknown): number

        /**
		 * returns true if value is an array; returns false if value is not an array
		 * @env Client | Server
		 * @param {boolean} pVal - value to check for array
		 * @returns {boolean} returns true if value is an array; returns false if value is not an array
		 */
		isArray(pVal: boolean): boolean

        /**
		 * returns an array containing the values of pO
		 * @env Client | Server
		 * @param {object} pO - object to get values from
		 * @returns {unknown[]} returns an array containing the values of pO
		 */
		getObjectValues(pO: object): unknown[]

        /**
		 * copies all variables from pC and gives them to pO; warning: trying to copy an object that has recursive references will reach a stack limit and throw an error
		 * @env Client | Server
		 * @param {object} pO - object to set variables of
		 * @param {object} pC - object to copy variables from
		 * @param {boolean} [pD] - optional; set this if copying from a Vylocity Object or an object that references another Vylocity Object
		 */
		copyObject(pO: object, pC: object, pD?: boolean): void

        /**
		 * returns new text that has been encoded to make it a valid URI
		 * @env Client | Server
		 * @param {string} pText - text to encode
		 * @returns {string} returns new text that has been encoded to make it a valid URI
		 */
		encodeURI(pText: string): string

        /**
		 * returns a randomly picked item from pVal1 (if an array and pVal2 is not set) or all the arguments provided
		 * @env Client | Server
		 * @param {unknown[]} pValn - first value to pick from or an array to pick from
		 * @returns {unknown} returns a randomly picked item from pVal1 (if an array and pVal2 is not set) or all the arguments provided
		 */
		pick(pValn: unknown[]): unknown

        /**
		 * returns pVal converted to a whole number
		 * @env Client | Server
		 * @param {boolean} pVal - value to get number from
		 * @param {number} pRadix - number between 2 and 36 to use as the base for the supplied number; 10 for normal base (0-9), 16 for hex (0-F)
		 * @returns {number} returns pVal converted to a whole number
		 */
		parseInt(pVal: boolean, pRadix: number): number

        /**
		 * returns a regular expression pattern from the pPattern string using the pFlags flag
		 * @env Client | Server
		 * @param {unknown} pPattern - regular expression (regex) pattern string
		 * @param {unknown} [pFlags] - optional; 'g' = global match; 'i' = ignore case; 'm' = multiline, treat start and end characters (^ and $) as working over multiple lines;
		 * @returns {RegExp} returns a regular expression pattern from the pPattern string using the pFlags flag
		 */
		regExp(pPattern: unknown, pFlags?: unknown): RegExp

        /**
		 * returns char or string associated with the code pCode
		 * @env Client | Server
		 * @param {unknown} pCode - code to get character of; can use multiple codes separated by commas which returns the codes as a string
		 * @returns {string} returns the codes as a string<br />
				called: returns char or string associated with the code pCode
		 */
		getCharFromCode(pCode: unknown): string

        /**
		 * returns true if value is a number; returns false if value is not a number
		 * @env Client | Server
		 * @param {boolean} pVal - value to check for number
		 * @returns {boolean} returns true if value is a number; returns false if value is not a number
		 */
		isNumber(pVal: boolean): boolean

        /**
		 * returns new style as text after being processed by the engine, translating vyi: and vyf: tags and so on
		 * @env Client | Server
		 * @param {string} pStyle - string containing web styles
		 * @returns {void} returns new style as text after being processed by the engine, translating vyi: and vyf: tags and so on
		 */
		getWebStyle(pStyle: string): void

        /**
		 * returns true if value is a function; returns false if value is not a function
		 * @env Client | Server
		 * @param {boolean} pVal - value to check for function
		 * @returns {boolean} returns true if value is a function; returns false if value is not a function
		 */
		isFunction(pVal: boolean): boolean

        /**
		 * returns an array containing the values all of key names (variable names) of pO
		 * @env Client | Server
		 * @param {object} pO - object to get key names from
		 * @returns {string[]} returns an array containing the values all of key names (variable names) of pO
		 */
		getObjectKeys(pO: object): string[]

        /**
		 * converts an ArrayBuffer to a base64 string
		 * @env Client | Server
		 * @param {unknown} pArrBuff - ArrayBuffer to convert to base64
		 */
		arrayBufferToBase64(pArrBuff: unknown): void

        /**
		 * returns pVal converted to a string value
		 * @env Client | Server
		 * @param {boolean} pVal - value to get string from
		 * @returns {string} returns pVal converted to a string value
		 */
		toString(pVal: boolean): string

        /**
		 * returns new text that has been decoded
		 * @env Client | Server
		 * @param {string} pText - text to decode
		 * @returns {string} returns new text that has been decoded
		 */
		decodeURIComponent(pText: string): string

        /**
		 * gets all the variables that can be saved and returns a new object that contains those values which can then be saved (no internal engine variables, no functions, no references to Vylocity Objects)
		 * @env Client | Server
		 * @param {object} pS - object to get saveable values from
		 * @param {object} [pO] - optional; alter this object and return it as the return object
		 * @returns {object} returns a new object that contains those values which can then be saved (no internal engine variables, no functions, no references to Vylocity Objects)
		 */
		getSaveObject(pS: object, pO?: object): object
                
	}
            
                
	
	/**The event object.*/
	type Event = {
                    
		/**
		 * remove pO to the ticker
		 * @env Client | Server
		 * @param {unknown} pO - reference to the object
		 */
		removeTicker(pO: unknown): void

        /**
		 * add pO to the ticker
		 * @env Client | Server
		 * @param {unknown} pO - reference to the object
		 * @param {object} [pS] - optional; an object containing settings for this object's ticker
		 */
		addTicker(pO: unknown, pS?: object): void

        /**
		 * forces a thread to stop doing its executions
		 * @env Client | Server
		 * @param {boolean} pVal - variable linking to the thread to be interrupted
		 */
		interruptThread(pVal: boolean): void

        /**
		 * returns an array of all active objects with tickers running
		 * @env Client | Server
		 * @returns {Diob[] | Object[]} returns an array of all active objects with tickers running
		 */
		getTickers(): Diob[] | Object[]

        /**
		 * prevents a specific spawn from occuring
		 * @env Client | Server
		 * @param {boolean} pVal - variable linking to the spawn to be interrupted
		 */
		interruptSpawn(pVal: boolean): void

        /**
		 * pauses or resumes all tickers
		 * @env Client | Server
		 * @param {boolean} [pBool] - optional; true or false
		 */
		toggleTicker(pBool?: boolean): void
                
	}
            
                
	
	/**The file object.*/
	type File = {
                    
		/**
		 * checks if pFile exists
		 * @env Server
		 * @param {string} pFile - path to the file or directory to check
		 * @param {Function} pFunc - function to call after pPath has been checked; first argument pExists determines if pPath exists or not
		 */
		exists(pFile: string, pFunc: Function): void

        /**
		 * returns an object containing stat information for the file at pPath and calls pFunc with the first argument being the stat object and the second being an error (if any)
		 * @env Server
		 * @param {string} pPath - path to the file to get stats for
		 * @param {Function} pFunc - function to call after
		 * @returns {object} returns an object containing stat information for the file at pPath and calls pFunc with the first argument being the stat object and the second being an error (if any)
		 */
		getStats(pPath: string, pFunc: Function): object

        /**
		 * reads the data and returns the data in pFunc
		 * @env Server
		 * @param {string} pFile - path to the file
		 * @param {Function} pFunc - function to call after reading is complete; first argument pData is set to the data read; second arg pErr is set if an error has occured
		 * @returns {void} returns the data in pFunc
		 */
		readText(pFile: string, pFunc: Function): void

        /**
		 * creates pFile if it does not exist and then saves the pSave object to the file; overwrites existing data
		 * @env Server
		 * @param {string} pFile - path to the file
		 * @param {object} pSave - object to save to the file for example ( {'value1': 1, 'value2': 2} )
		 * @param {Function} pFunc - function to call after writing is complete; first argument pErr is set if an error has occured
		 */
		writeSave(pFile: string, pSave: object, pFunc: Function): void

        /**
		 * creates pFile if needed and then add pData to the end of the file
		 * @env Server
		 * @param {string} pFile - path to the file
		 * @param {unknown} pData - text to add to the end of pFile
		 * @param {Function} pFunc - function to call after appending is complete; first argument pErr is set if an error has occured
		 */
		appendText(pFile: string, pData: unknown, pFunc: Function): void

        /**
		 * provides an array of files in pPath directory
		 * @env Server
		 * @param {string} pPath - path to the directory
		 * @param {Function} pFunc - function to call after the directory has been read; first argument pFiles is an array of the files in the directory, second argument pErr is an error if there is one
		 */
		readDir(pPath: string, pFunc: Function): void

        /**
		 * deletes the file or directory at pPath; all child files are also deleted
		 * @env Server
		 * @param {string} pPath - path to the file or directory to delete
		 * @param {Function} pFunc - function to call after pPath has been removed
		 */
		remove(pPath: string, pFunc: Function): void

        /**
		 * provides a stat object which contains information on the file; you can use isFile() and isDirectory() on the object to check if they are files or directories
		 * @env Server
		 * @param {string} pPath - path to the file or directory
		 * @param {Function} pFunc - function to call after pPath has been checked; first argument pStat is an object containing stat information for the file, second argument pErr is an error if there is one
		 */
		stat(pPath: string, pFunc: Function): void

        /**
		 * creates a new directory at the location of pPath
		 * @env Server
		 * @param {string} pPath - path to create the new directory
		 * @param {Function} pFunc - function to call after the directory has been made
		 */
		makeDir(pPath: string, pFunc: Function): void

        /**
		 * returns an array of file names inside the pPath dir and calls pFunc with the first argument being the array and the second being an error (if any)
		 * @env Server
		 * @param {string} pPath - path to the directory to get contents of
		 * @param {Function} pFunc - function to call after
		 * @returns {string[]} returns an array of file names inside the pPath dir and calls pFunc with the first argument being the array and the second being an error (if any)
		 */
		getDir(pPath: string, pFunc: Function): string[]

        /**
		 * reads pFile and returns an object from the data in pFunc
		 * @env Server
		 * @param {string} pFile - path to the file
		 * @param {Function} pFunc - function to call after reading is complete; first argument pData is set to the data read; second arg pErr is set if an error has occured
		 * @returns {object} returns an object from the data in pFunc
		 */
		readSave(pFile: string, pFunc: Function): object

        /**
		 * creates pFile if needed and then writes pData to the file; overwrites existing data
		 * @env Server
		 * @param {string} pFile - path to the file
		 * @param {unknown} pData - text to put into the file
		 * @param {Function} pFunc - function to call after writing is complete; first argument pErr is set if an error occurs
		 */
		writeText(pFile: string, pData: unknown, pFunc: Function): void
                
	}
            
                
	
	/**The icon object.*/
	type Icon = {
                    
		/**
		 * creates a new blank icon named pIcon inside of the atlas pAtlas
		 * @env Client | Server
		 * @param {string} pAtlas - name of the icon atlas to add the icon to
		 * @param {string} pIcon - name of the new icon
		 * @param {number} [pWidth] - optional; width of the new icon; uses tileWidth if not defined
		 * @param {number} [pHeight] - optional; height of the new icon; uses tileHeight if not defined
		 */
		newIcon(pAtlas: string, pIcon: string, pWidth?: number, pHeight?: number): void

        /**
		 * alters color of the specified icon(s) based on the specified info; For example {'type': 'normal', 'red': 100} or just {'red': 100} would add 100 red to all pixels; {'red': -100} would reduce 100 red from all pixels; {'type': 'swap', 'red': 100, 'blue': 100, 'green': 100, 'newRed': 200} would find all pixels with the color rgb(100, 100, 100) and replace it with rgb(200, 100, 100); If any of the colors are not included, such as 'alpha', it will ignore that color, otherwise if it is set, it will take that color into account; {'type': 'multiply', 'hex': '#FFF'} would multiply blend white onto the icon, you can use 'hex' for the red, green, and blue values; for 'swap' you can use 'colors' which should equal an array of objects containing all of the color swaps you want to do if there is more than one
		 * @env Client | Server
		 * @param {object} pInfo - an object containing information to be used for the color alteration
		 * @param {string} pAtlas - name of the icon atlas involved
		 * @param {string} pIcon - name of the icon involved
		 * @param {string} [pState] - optional; name of the icon state involved
		 * @param {number} [pFrame] - optional; number of the frame involved
		 * @param {Function} [pFunc] - optional; function to call after the icon has changed; passes an error as the first argument if there was en error
		 */
		alterColor(pInfo: object, pAtlas: string, pIcon: string, pState?: string, pFrame?: number, pFunc?: Function): void

        /**
		 * returns object containing the width and height of the icon; ex {'width': 100, 'height': 100}
		 * @env Client | Server
		 * @param {string} pAtlas - name of the icon atlas
		 * @param {string} pIcon - name of the icon
		 * @param {string} [pState] - optional; name of the state
		 * @param {number} [pFrame] - optional; number of the frame
		 * @returns {object} returns object containing the width and height of the icon; ex {'width': 100, 'height': 100}
		 */
		getIconSize(pAtlas: string, pIcon: string, pState?: string, pFrame?: number): object

        /**
		 * returns a string containing the base64 data url for the icon which can then be used to display the icon as an image in HTML
		 * @env Client | Server
		 * @param {string} pAtlas - name of the icon atlas
		 * @param {string} pIcon - name of the icon
		 * @param {string} [pState] - optional; name of the state
		 * @param {number} [pFrame] - optional; number of the frame
		 * @returns {string} returns a string containing the base64 data url for the icon which can then be used to display the icon as an image in HTML
		 */
		getDataURL(pAtlas: string, pIcon: string, pState?: string, pFrame?: number): string

        /**
		 * grabs an object with the width and height of the icon and an array of pixel data for the entire icon. The array of pixel data can then be changed and used elsewhere or drawn onto another icon. To read the width and height you could use object.width and object.height, where object is the object returned by the function. The object data array is as follows: object.data[0] is the red value (0-255) of the pixel at 0,0, object.data[1] is the green value (0-255) of the pixel at 0,0, object.data[2] is the blue value (0-255) of the pixel at 0,0, and object.data[3] is the alpha value (0-255) of the pixel at 0,0. Then object.data[4], object.data[5], object.data[6], and object.data[7] are the respective values for the pixel at 1,0. This trend continues through the whole array for every pixel.
		 * @env Client | Server
		 * @param {string} pAtlas - name of the icon atlas involved
		 * @param {string} pIcon - name of the icon involved
		 * @param {string} [pState] - optional; name of the icon state involved
		 * @param {number} [pFrame] - optional; number of the frame involved
		 */
		getRawData(pAtlas: string, pIcon: string, pState?: string, pFrame?: number): ArrayBuffer

        /**
		 * change frame pFrame delay to pDelay
		 * @env Client | Server
		 * @param {string} pAtlas - name of the icon atlas to add the frame to
		 * @param {string} pIcon - name of the icon involved
		 * @param {string} pState - name of the icon state involved
		 * @param {number} pFrame - frame number
		 * @param {number} pDelay - delay number
		 */
		setFrameDelay(pAtlas: string, pIcon: string, pState: string, pFrame: number, pDelay: number): void

        /**
		 * get delay of pFrame
		 * @env Client | Server
		 * @param {string} pAtlas - name of the icon atlas to add the frame to
		 * @param {string} pIcon - name of the icon involved
		 * @param {string} pState - name of the icon state involved
		 * @param {number} pFrame - frame number
		 */
		getFrameDelay(pAtlas: string, pIcon: string, pState: string, pFrame: number): void

        /**
		 * loads all the images for each specified icon; icon images are loaded when an icon or state is shown to a client, if you plan on altering an icon that the client hasn't seen yet, you'll want to use this function to cache it first
		 * @env Client | Server
		 * @param {string} pAtlas - name of the icon atlas
		 * @param {string} [pIcon] - optional; name of the icon
		 * @param {Function} [pFunc] - optional; function called after the images have been loaded and cached
		 */
		cacheImage(pAtlas: string, pIcon?: string, pFunc?: Function): void

        /**
		 * returns an array of strings containing the names of all the icons in pAtlas
		 * @env Client | Server
		 * @param {string} pAtlas - name of the icon atlas
		 * @returns {string[]} returns an array of strings containing the names of all the icons in pAtlas
		 */
		getIconNames(pAtlas: string): string[]

        /**
		 * returns number of frames the icon has
		 * @env Client | Server
		 * @param {string} pAtlas - name of the icon atlas to add the frame to
		 * @param {string} pIcon - name of the icon involved
		 * @param {string} pState - name of the icon state involved
		 * @returns {number} returns number of frames the icon has
		 */
		getFrameCount(pAtlas: string, pIcon: string, pState: string): number

        /**
		 * creates a new blank frame; if pState is defined the frame is added to the state, otherwise it is added to pIcon
		 * @env Client | Server
		 * @param {number} pDelay - number of milliseconds to give the frame delay; null for default, which is 100
		 * @param {string} pAtlas - name of the icon atlas to add the frame to
		 * @param {string} pIcon - name of the icon involved
		 * @param {string} [pState] - optional; name of the icon state involved
		 */
		newFrame(pDelay: number, pAtlas: string, pIcon: string, pState?: string): void

        /**
		 * creates a clone of an atlas, icon, icon state, or frame
		 * @env Client | Server
		 * @param {object} pArgs - an object containing the information for the clone; useable varables: 'atlas', 'newAtlas', 'icon', 'newIcon', 'state', 'newState', and 'frame'
		 */
		clone(pArgs: object): void

        /**
		 * creates a new blank icon state named pState for pIcon in the atlas pAtlas
		 * @env Client | Server
		 * @param {string} pAtlas - name of the icon atlas to add the icon state to
		 * @param {string} pIcon - name of the icon to add the icon state to
		 * @param {string} pState - name of the new icon state
		 */
		newIconState(pAtlas: string, pIcon: string, pState: string): void

        /**
		 * performs the specified draw function on the specified icon using the specified pArgs object; ex ( {'type': 'image', 'image': this, 'x': 1, 'y': 1} )
		 * @env Client | Server
		 * @param {object | object[]} pArgs - an object or array of objects which determines the settings of the draw
		 * @param {string} pAtlas - type of draw
		 * @param {string} pIcon - draw an image
		 * @param {string} pState - either a path to an image or a diob (in which case the diob's icon will be used) or an object containing icon information (ex {'atlasName': 'test', 'iconName': 'a', 'iconState': 's', 'frame': 2} )
		 * @param {number} pFrame - x position to draw the image
		 * @param {Function} pFunc - y position to draw the image
		 */
		draw(pArgs: object | object[], pAtlas: string, pIcon: string, pState: string, pFrame: number, pFunc: Function): void

        /**
		 * changes the icon to match the pixel data given with pData
		 * @env Client | Server
		 * @param {unknown} pData - pixel data object to use
		 * @param {string} pAtlas - name of the icon atlas involved
		 * @param {string} pIcon - name of the icon involved
		 * @param {string} [pState] - optional; name of the icon state involved
		 * @param {number} [pFrame] - optional; number of the frame involved
		 * @param {Function} [pFunc] - optional; function to call after the icon data has changed and loaded
		 */
		setRawData(pData: unknown, pAtlas: string, pIcon: string, pState?: string, pFrame?: number, pFunc?: Function): void

        /**
		 * returns an array of strings containing the names of all the icon states belonging to the icon pIcon in icon atlas pAtlas
		 * @env Client | Server
		 * @param {string} pAtlas - name of the icon atlas
		 * @param {string} pIcon - name of the icon
		 * @returns {string[]} returns an array of strings containing the names of all the icon states belonging to the icon pIcon in icon atlas pAtlas
		 */
		getIconStateNames(pAtlas: string, pIcon: string): string[]

        /**
		 * create a new icon atlas with the name pAtlas
		 * @env Client | Server
		 */
		newAtlas(): void

        /**
		 * sets the image of the specified icon using the pData data URL
		 * @env Client | Server
		 * @param {unknown} pData - text containing data URL
		 * @param {string} pAtlas - name of the icon atlas
		 * @param {string} pIcon - name of the icon
		 * @param {string} [pState] - optional; name of the state
		 * @param {number} [pFrame] - optional; number of the frame
		 * @param {Function} [pFunc] - optional; function to call after the icon has changed; passes an error as the first argument if there was en error
		 */
		setDataURL(pData: unknown, pAtlas: string, pIcon: string, pState?: string, pFrame?: number, pFunc?: Function): void

        /**
		 * applies a filter to the icon(s) involved; possible filter types: 'grayscale', 'invert', 'darken', 'lighten'
		 * @env Client | Server
		 * @param {object} pFilter - an object containing needed information for filter; {'type': 'darken', 'value': 10} would darken the image by 10;
		 * @param {string} pAtlas - name of the icon atlas involved
		 * @param {string} pIcon - name of the icon involved
		 * @param {string} [pState] - optional; name of the icon state involved
		 * @param {number} [pFrame] - optional; number of the frame involved
		 * @param {Function} [pFunc] - optional; function to call after the icon has changed; passes an error as the first argument if there was en error
		 */
		applyFilter(pFilter: object, pAtlas: string, pIcon: string, pState?: string, pFrame?: number, pFunc?: Function): void
                
	}
            
                
	
	/**The map object.*/
	type Map = {
                    
		/**
		 * returns number of tiles between pA and pB
		 * @env Client | Server
		 * @param {Diob | Object} pA - Diob reference or object containing location information; ex {'xCoord': 1, 'yCoord': 1, 'mapName': 'map'}
		 * @param {Diob | Object} pB - Diob reference or object containing location information; ex {'xCoord': 1, 'yCoord': 1, 'mapName': 'map'}
		 * @returns {number} returns number of tiles between pA and pB
		 */
		getTileDist(pA: Diob | Object, pB: Diob | Object): number

        /**
		 * returns an array of diobs on the map pMap depending on the provided arguments; if pType is not set, all diobs on the map will be returned; if pType is set but pChild is not, diobs on the map with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs on the map will be returned
		 * @env Client | Server
		 * @param {string} pMap - name of the map to get diobs from
		 * @param {string} [pType] - optional; string containing type path to return
		 * @param {boolean} [pChild] - optional; boolean that determines if child types are included
		 * @param {Diob[]} [pAdd] - optional; if set, tiles and regions on the map will also be returned
		 * @returns {Diob[]} returns an array of diobs on the map pMap depending on the provided arguments; if pType is not set, all diobs on the map will be returned; if pType is set but pChild is not, diobs on the map with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs on the map will be returned
		 */
		getDiobs(pMap: string, pType?: string, pChild?: boolean, pAdd?: Diob[]): Diob[]

        /**
		 * changes the sized of pMap to the width and height of pW and pH; reducing the size will delete diobs that are no longer within the map size
		 * @env Client | Server
		 * @param {string} pMap - name of the map to set the size of
		 * @param {number} pW - width in tiles to give the map
		 * @param {number} pH - height in tiles to give the map
		 * @param {string} pTile - tile object type to use as the default tiles for newly created tiles
		 */
		setMapSize(pMap: string, pW: number, pH: number, pTile: string): void

        /**
		 * returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are visible to the diob
		 * @env Client | Server
		 * @param {Diob | Object} pO - diob or range object to get range from; range object example {'map': 'name', 'x': 1, 'y': 1}; using a range object will use the tile at the specified location for the reference diob
		 * @param {boolean} pOmit - either x distance or x and y distance
		 * @returns {Diob[]} returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are visible to the diob
		 */
		getTileRangeView(pO: Diob | Object, pOmit: boolean): Diob[]

        /**
		 * sets the Tile at pLoc to pT and returns the new tile
		 * @env Client | Server
		 * @param {Diob | Object} pLoc - either a Tile reference or an object containing location information; ex {'xCoord': 1, 'yCoord': 1, 'mapName': 'map'}
		 * @param {string} pT - either a type string containing the type of a new Tile or a reference to a Tile that does not already have a location on the map
		 * @returns {Diob} returns the new tile
		 */
		setLoc(pLoc: Diob | Object, pT: string): Diob

        /**
		 * returns the tiles on pMap within the specified area; if no area is specified, all tiles will be returned
		 * @env Client | Server
		 * @param {string} pMap - name of the map to get tiles from
		 * @param {number} [pX] - optional; starting x coordinate
		 * @param {number} [pY] - optional; starting y coordinate
		 * @param {number} [pW] - optional; number of tiles to get from the right of pX; negative numbers to get tiles from the left
		 * @param {number} [pH] - optional; number of tiles to get from below pY; negative numbers to get tiles from above
		 * @returns {Diob[]} returns the tiles on pMap within the specified area; if no area is specified, all tiles will be returned
		 */
		getTiles(pMap: string, pX?: number, pY?: number, pW?: number, pH?: number): Diob[]

        /**
		 * returns an array of diobs on the map pMap that have the tag pTag
		 * @env Client | Server
		 * @param {string} pTag - string containing tag to look for
		 * @param {string} [pMap] - optional; name of map to search
		 * @returns {Diob[]} returns an array of diobs on the map pMap that have the tag pTag
		 */
		getDiobsByTag(pTag: string, pMap?: string): Diob[]

        /**
		 * returns number of pixels between the center of pA and the center of pB; you can change the origin by passing custom objects and changing the width and height by double of the amount to offset
		 * @env Client | Server
		 * @param {Diob | Object} pA - Diob reference or object containing location and size information; ex {'xPos': 1, 'yPos': 1, 'mapName': 'map', 'width': 32, 'height': 32}
		 * @param {Diob | Object} pB - Diob reference or object containing location and size information; ex {'xPos': 1, 'yPos': 1, 'mapName': 'map', 'width': 32, 'height': 32}
		 * @param {boolean} [pEdge] - optional; if set, the edges of the diobs will be used instead of the center
		 * @returns {number} returns number of pixels between the center of pA and the center of pB; you can change the origin by passing custom objects and changing the width and height by double of the amount to offset
		 */
		getDist(pA: Diob | Object, pB: Diob | Object, pEdge?: boolean): number

        /**
		 * returns a the angle in radians between pA and pB
		 * @env Client | Server
		 * @param {Diob | Object} pA - first diob
		 * @param {Diob | Object} pB - second diob
		 * @param {boolean} pCenter - set to get angle from the centers
		 * @returns {number} returns a the angle in radians between pA and pB
		 */
		getAngle(pA: Diob | Object, pB: Diob | Object, pCenter: boolean): number

        /**
		 * returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are visible to the diob and that have the same type as pType or a parent type of pType if pChild is enabled
		 * @env Client | Server
		 * @param {Diob | Object} pO - diob or range object to get range from; range object example {'map': 'name', 'x': 1, 'y': 1}; using a range object will use the tile at the specified location for the reference diob
		 * @param {string} pType - type or parent type of diobs to get
		 * @param {boolean} pChild - true to include all child diobs; false to include only diobs with the exact type of pType
		 * @param {boolean} pOmit - either x distance or x and y distance
		 * @returns {Diob[]} returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are visible to the diob and that have the same type as pType or a parent type of pType if pChild is enabled
		 */
		getRangeViewByType(pO: Diob | Object, pType: string, pChild: boolean, pOmit: boolean): Diob[]

        /**
		 * returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are able to see the diob and that have the same type as pType or a parent type of pType if pChild is enabled
		 * @env Client | Server
		 * @param {Diob | Object} pO - diob or range object to get range from; range object example {'map': 'name', 'x': 1, 'y': 1}; using a range object will use the tile at the specified location for the reference diob
		 * @param {string} pType - type or parent type of diobs to get
		 * @param {boolean} pChild - true to include all child diobs; false to include only diobs with the exact type of pType
		 * @param {boolean} pOmit - either x distance or x and y distance
		 * @returns {Diob[]} returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are able to see the diob and that have the same type as pType or a parent type of pType if pChild is enabled
		 */
		getTileRangeViewersByType(pO: Diob | Object, pType: string, pChild: boolean, pOmit: boolean): Diob[]

        /**
		 * reference to a tile that exists in the void, this tile is used if a movable interacts with the edge of the map
		 * @env Client | Server
		 */
		void: Diob

        /**
		 * array containing all the direction strings; ['east', 'northeast', 'north', 'northwest', 'west', 'southwest', 'south', 'southeast']
		 * @env Client | Server
		 */
		dirs: ['east', 'northeast', 'north', 'northwest', 'west', 'southwest', 'south', 'southeast']

        /**
		 * returns an array containing all the tiles on the map within x and y pixels around the specified diob
		 * @env Client | Server
		 * @param {Diob | Object} pD - diob or range object to get range from; range object example {'map': 'name', 'x': 1, 'y': 1}; using a range object will use the tile at the specified location for the reference diob
		 * @param {string} pType - either x distance or x and y distance
		 * @param {boolean} pChild - if set, y distance
		 * @param {boolean} pOmit - type or parent type of tiles to get
		 * @returns {Diob[]} returns an array containing all the tiles on the map within x and y pixels around the specified diob
		 */
		getTilesByRange(pD: Diob | Object, pType: string, pChild: boolean, pOmit: boolean): Diob[]

        /**
		 * returns a tile of a given location; if pVal1 and pVal2 are numbers and pVal3 is a string, it returns the tile at the coordinates pVal1, pVal2 on the map pVal3; if pVal1 is an object and not a tile, it returns the object's location; if pVal1 is a tile, it returns the tile back
		 * @env Client | Server
		 * @returns {Diob} returns a tile of a given location; if pVal1 and pVal2 are numbers and pVal3 is a string, it returns the tile at the coordinates pVal1, pVal2 on the map pVal3; if pVal1 is an object and not a tile, it returns the object's location; if pVal1 is a tile, it returns the tile back
		 */
		getLoc(): Diob

        /**
		 * returns the Tile next to the location of pL based on the direction of pDir
		 * @env Client | Server
		 * @param {Diob | Object} pL - reference to Diob or location object; ex {'xCoord': 1, 'yCoord': 1, 'mapName': 'map'}
		 * @param {string} pDir - string containing direction
		 * @returns {Diob} returns the Tile next to the location of pL based on the direction of pDir
		 */
		getLocByDir(pL: Diob | Object, pDir: string): Diob

        /**
		 * deletes the map and all diobs on it
		 * @env Client | Server
		 * @param {string | number} pName - name of the map to delete
		 */
		deleteMap(pName: string | number): void

        /**
		 * returns the Tile by the position pX, pY on the map pMap
		 * @env Client | Server
		 * @param {number} pX - x position
		 * @param {number} pY - y position
		 * @param {string} pMap - map name
		 * @returns {Diob} returns the Tile by the position pX, pY on the map pMap
		 */
		getLocByPos(pX: number, pY: number, pMap: string): Diob

        /**
		 * returns an array of all map names of maps currently loaded
		 * @env Client | Server
		 * @returns {string[]} returns an array of all map names of maps currently loaded
		 */
		getMaps(): string[]

        /**
		 * returns a string containing the direction from pA to pB from their origins
		 * @env Client | Server
		 * @param {Diob | Object} pA - first diob
		 * @param {Diob | Object} pB - second diob
		 * @param {boolean} pCenter - set to get dir from the centers
		 * @param {boolean} pCard - if set, only cardinal directions will be returned (north, south, east, west)
		 * @returns {string[]} returns a string containing the direction from pA to pB from their origins
		 */
		getDir(pA: Diob | Object, pB: Diob | Object, pCenter: boolean, pCard: boolean): string[]

        /**
		 * returns an array of diobs in the Region pR on all loaded maps or on the map pMap if specified with a type of pType (if specified) or a child of pType if pChild is set
		 * @env Client | Server
		 * @param {string} pR - either a type string containing the type of Region or a reference to a Region
		 * @param {string} pType - type or parent type of diobs to get
		 * @param {boolean} pChild - true to include all child diobs; false to include only diobs with the exact type of pType
		 * @param {string} [pMap] - optional; name of the map to check the Region of; if not set all loaded maps with the specified Region will be used
		 * @returns {unknown[]} returns an array of diobs in the Region pR on all loaded maps or on the map pMap if specified with a type of pType (if specified) or a child of pType if pChild is set
		 */
		getDiobsByRegion(pR: string, pType: string, pChild: boolean, pMap?: string): unknown[]

        /**
		 * returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are able to see the diob
		 * @env Client | Server
		 * @param {Diob | Object} pO - diob or range object to get range from; range object example {'map': 'name', 'x': 1, 'y': 1}; using a range object will use the tile at the specified location for the reference diob
		 * @param {boolean} pOmit - either x distance or x and y distance
		 * @returns {Diob[]} returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are able to see the diob
		 */
		getTileRangeViewers(pO: Diob | Object, pOmit: boolean): Diob[]

        /**
		 * returns an array of diobs on the map pMap that overlap the specified position box depending on the provided arguments; if pType is not set, all diobs in the position box will be returned; if pType is set but pChild is not, diobs in the position box with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs on the map will be returned
		 * @env Client | Server
		 * @param {string} pMap - name of the map to get diobs from
		 * @param {number} pX - starting x position
		 * @param {number} pY - starting y position
		 * @param {string} [pType] - optional; ending x position
		 * @param {boolean} [pChild] - optional; ending y position
		 * @param {string} [pAdd] - optional; string containing type path to return
		 * @returns {unknown[]} returns an array of diobs on the map pMap that overlap the specified position box depending on the provided arguments; if pType is not set, all diobs in the position box will be returned; if pType is set but pChild is not, diobs in the position box with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all mobs on the map will be returned
		 */
		getDiobsByPos(pMap: string, pX: number, pY: number, pType?: string, pChild?: boolean, pAdd?: string): unknown[]

        /**
		 * creates a new map which is a clone of a map file
		 * @env Client | Server
		 * @param {string} pMap - name of the map file to clone
		 * @param {string | number} pName - name to give the new cloned map
		 * @param {Function} [pFunc] - optional; function to call once the clone is finished
		 */
		cloneMap(pMap: string, pName: string | number, pFunc?: Function): void

        /**
		 * returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are able to see the diob
		 * @env Client | Server
		 * @param {Diob | Object} pO - diob or range object to get range from; range object example {'map': 'name', 'x': 1, 'y': 1}; using a range object will use the tile at the specified location for the reference diob
		 * @param {boolean} pOmit - either x distance or x and y distance
		 * @returns {Diob[]} returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are able to see the diob
		 */
		getRangeViewers(pO: Diob | Object, pOmit: boolean): Diob[]

        /**
		 * returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob
		 * @env Client | Server
		 * @param {Diob | Object} pO - diob or range object to get range from; range object example {'map': 'name', 'x': 1, 'y': 1}; using a range object will use the tile at the specified location for the reference diob
		 * @param {boolean} pOmit - either x distance or x and y distance
		 * @returns {Diob[]} returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob
		 */
		getRange(pO: Diob | Object, pOmit: boolean): Diob[]

        /**
		 * returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that have the same type as pType or a parent type of pType if pChild is enabled
		 * @env Client | Server
		 * @param {Diob | Object} pO - diob or range object to get range from; range object example {'map': 'name', 'x': 1, 'y': 1}; using a range object will use the tile at the specified location for the reference diob
		 * @param {string} pType - type or parent type of diobs to get
		 * @param {boolean} pChild - true to include all child diobs; false to include only diobs with the exact type of pType
		 * @param {boolean} pOmit - either x distance or x and y distance
		 * @returns {Diob[]} returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that have the same type as pType or a parent type of pType if pChild is enabled
		 */
		getRangeByType(pO: Diob | Object, pType: string, pChild: boolean, pOmit: boolean): Diob[]

        /**
		 * returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that have the same type as pType or a parent type of pType if pChild is enabled
		 * @env Client | Server
		 * @param {Diob | Object} pO - diob or range object to get range from; range object example {'map': 'name', 'x': 1, 'y': 1}; using a range object will use the tile at the specified location for the reference diob
		 * @param {string} pType - type or parent type of diobs to get
		 * @param {boolean} pChild - true to include all child diobs; false to include only diobs with the exact type of pType
		 * @param {boolean} pOmit - either x distance or x and y distance
		 * @returns {Diob[]} returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that have the same type as pType or a parent type of pType if pChild is enabled
		 */
		getTileRangeByType(pO: Diob | Object, pType: string, pChild: boolean, pOmit: boolean): Diob[]

        /**
		 * returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are able to see the diob and that have the same type as pType or a parent type of pType if pChild is enabled
		 * @env Client | Server
		 * @param {Diob | Object} pO - diob or range object to get range from; range object example {'map': 'name', 'x': 1, 'y': 1}; using a range object will use the tile at the specified location for the reference diob
		 * @param {string} pType - type or parent type of diobs to get
		 * @param {boolean} pChild - true to include all child diobs; false to include only diobs with the exact type of pType
		 * @param {boolean} pOmit - either x distance or x and y distance
		 * @returns {Diob[]} returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are able to see the diob and that have the same type as pType or a parent type of pType if pChild is enabled
		 */
		getRangeViewersByType(pO: Diob | Object, pType: string, pChild: boolean, pOmit: boolean): Diob[]

        /**
		 * returns an array active clients that have player mobs on the map pMap
		 * @env Client | Server
		 * @param {string} pMap - name of the map to get clients from
		 * @returns {Client[]} returns an array active clients that have player mobs on the map pMap
		 */
		getClients(pMap: string): Client[]

        /**
		 * returns the region based on the type pType
		 * @env Client | Server
		 * @param {string} pType - type of the region to grab
		 * @returns {Diob} returns the region based on the type pType
		 */
		getRegionByType(pType: string): Diob

        /**
		 * returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are visible by the diob and that have the same type as pType or a parent type of pType if pChild is enabled
		 * @env Client | Server
		 * @param {Diob | Object} pO - diob or range object to get range from; range object example {'map': 'name', 'x': 1, 'y': 1}; using a range object will use the tile at the specified location for the reference diob
		 * @param {string} pType - type or parent type of diobs to get
		 * @param {boolean} pChild - true to include all child diobs; false to include only diobs with the exact type of pType
		 * @param {boolean} pOmit - either x distance or x and y distance
		 * @returns {Diob[]} returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob that are visible by the diob and that have the same type as pType or a parent type of pType if pChild is enabled
		 */
		getTileRangeViewByType(pO: Diob | Object, pType: string, pChild: boolean, pOmit: boolean): Diob[]

        /**
		 * sets the Region at pLoc to pR and returns the Region
		 * @env Client | Server
		 * @param {Diob | Object} pLoc - either a Tile reference or an object containing location information; ex {'xCoord': 1, 'yCoord': 1, 'mapName': 'map'}
		 * @param {string} pR - either a type string containing the type of a new Region or a reference to a Region
		 * @returns {Diob} returns the Region
		 */
		setRegion(pLoc: Diob | Object, pR: string): Diob

        /**
		 * returns an array of diobs on the map and screen depending on the provided arguments; if pType is not set, all map diobs on the screen will be returned; if pType is set but pChild is not, map diobs on the screen with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all map mobs on the screen will be returned
		 * @env Client
		 * @param {string} [pType] - optional; string containing type path to return
		 * @param {boolean} [pChild] - optional; boolean that determines if child types are included
		 * @param {Diob[]} [pAdd] - optional; if set, tiles and regions on the screen will also be returned
		 * @returns {Diob[]} returns an array of diobs on the map and screen depending on the provided arguments; if pType is not set, all map diobs on the screen will be returned; if pType is set but pChild is not, map diobs on the screen with the exact type of pType will be returned; if pType is set and pChild is set, all diobs with the type pType or a parent type of pType will be returned; for example, if pType is set to 'Mob' with pChild undefined, all diobs with the exact type of 'Mob' will be returned, but if pChild is set, then all map mobs on the screen will be returned
		 */
		getScreenDiobs(pType?: string, pChild?: boolean, pAdd?: Diob[]): Diob[]

        /**
		 * returns the direction string if pD.dir was rotated by pAngle radians; set pD to {'dir': 'east'} to find the raw direction from a raw angle, defaults to east if nothing passed in
		 * @env Client | Server
		 * @param {Diob} [pD] - optional; reference to diob or direction object; ex {'dir': 'east'}
		 * @param {number} [pAngle] - optional; angle in radians
		 * @returns {string} returns the direction string if pD.dir was rotated by pAngle radians; set pD to {'dir': 'east'} to find the raw direction from a raw angle, defaults to east if nothing passed in
		 */
		getDirByAngle(pD?: Diob, pAngle?: number): string

        /**
		 * creates a new map with the name pName and a size of pX, pY
		 * @env Client | Server
		 * @param {string | number} pName - unique name of the map
		 * @param {number} pX - amount of tiles on the x-axis
		 * @param {number} pY - amount of tiles on the y-axis
		 * @param {string} pTile - tile object type to use as the default tiles
		 */
		createMap(pName: string | number, pX: number, pY: number, pTile: string): void

        /**
		 * sends the data for the pD diob to all clients on the pMap map, if pVar is set it will send only those variables, if it is not set it will only send built-in engine variables
		 * @env Server
		 * @param {string} pMap - name of the map
		 * @param {Diob} pD - reference to the diob to send
		 * @param {unknown[]} [pVar] - optional; variable name or array of variable names
		 */
		sendDiob(pMap: string, pD: Diob, pVar?: unknown[]): void

        /**
		 * returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are visible to the diob
		 * @env Client | Server
		 * @param {Diob | Object} pO - diob or range object to get range from; range object example {'map': 'name', 'x': 1, 'y': 1}; using a range object will use the tile at the specified location for the reference diob
		 * @param {boolean} pOmit - either x distance or x and y distance
		 * @returns {Diob[]} returns an array containing all the non-tile diobs on the map within x and y positional units around the specified diob that are visible to the diob
		 */
		getRangeView(pO: Diob | Object, pOmit: boolean): Diob[]

        /**
		 * returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob
		 * @env Client | Server
		 * @param {Diob | Object} pO - diob or range object to get range from; range object example {'map': 'name', 'x': 1, 'y': 1}; using a range object will use the tile at the specified location for the reference diob
		 * @param {boolean} pOmit - either x distance or x and y distance
		 * @returns {Diob[]} returns an array containing all the non-tile diobs on the map within x and y tiles around the specified diob
		 */
		getTileRange(pO: Diob | Object, pOmit: boolean): Diob[]

        /**
		 * returns an object {'x': x, 'y': y, 'xPos': xPos, 'yPos': yPos} containing the number of x and y tiles on the map and the physical size of the map
		 * @env Client | Server
		 * @param {string} pMap - name of the map to get the size of
		 * @returns {{'x': number, 'y': number, 'xPos': number, 'yPos': number}} returns an object {'x': x, 'y': y, 'xPos': xPos, 'yPos': yPos} containing the number of x and y tiles on the map and the physical size of the map
		 */
		getMapSize(pMap: string): {'x': number, 'y': number, 'xPos': number, 'yPos': number}
                
	}
            
                
	
	/**The macro object.*/
	type Macro = {
                    
		/**
		 * creates a new blank macro atlas named pName
		 * @env Client | Server
		 * @param {string | number} pName - name of the new macro atlas
		 */
		newMacroAtlas(pName: string | number): void

        /**
		 * creates a new macro with the keyUp command pUp, and keyDown command pDown, and the name pName and adds it to the macro atlas pAtlas
		 * @env Client | Server
		 * @param {string | number} pName - name of the macro to create
		 * @param {string} pAtlas - name of the macro atlas to add the new macro to
		 * @param {string} pKey - string of key that will execute this macro
		 * @param {string} [pDown] - optional; string containing the command to execute when the key is pushed down; example 'test(1)' would execute the client command 'test' with one parameter that is equal to '1'
		 * @param {string} [pUp] - optional; string containing the command to execute when the key is let go of; example 'test(1)' would execute the client command 'test' with one parameter that is equal to '1'
		 */
		newMacro(pName: string | number, pAtlas: string, pKey: string, pDown?: string, pUp?: string): void

        /**
		 * returns an array containing the names of all the macros in the macro atlas pAtlas
		 * @env Client | Server
		 * @param {string} pAtlas - name of the macro atlas
		 * @returns {string[]} returns an array containing the names of all the macros in the macro atlas pAtlas
		 */
		getMacroNames(pAtlas: string): string[]

        /**
		 * returns an array containing the names of all the currently loaded macro atlases
		 * @env Client | Server
		 * @returns {string[]} returns an array containing the names of all the currently loaded macro atlases
		 */
		getMacroAtlasNames(): string[]

        /**
		 * removes the macro pName from the macro atlas pAtlas
		 * @env Client | Server
		 * @param {string | number} pName - name of the macro to remove
		 * @param {string} pAtlas - name of the macro atlas to remove the macro from
		 */
		removeMacro(pName: string | number, pAtlas: string): void
                
	}
            
                
	
	/**The type object.*/
	type Type = {
                    
		/**
		 * returns an object containing all the default variables belonging to the type pType
		 * @env Client | Server
		 * @param {string} pType - type to get variables of
		 * @param {unknown} [pAll] - optional; if set every variable this type has will be returned, if false only variables belonging directly to this type will be returned
		 * @returns {unknown[]} returns an object containing all the default variables belonging to the type pType
		 */
		getVariables(pType: string, pAll?: unknown): unknown[]

        /**
		 * returns the default value of the pVar variable belonging to the type pType
		 * @env Client | Server
		 * @param {string} pType - type to get variable of
		 * @param {unknown} pVar - name of the variable to get
		 * @param {unknown} [pOwn] - optional; if set the returned value will be undefined if the variable belongs to an inherited object
		 * @returns {unknown} returns the default value of the pVar variable belonging to the type pType
		 */
		getVariable(pType: string, pVar: unknown, pOwn?: unknown): unknown

        /**
		 * sets the type pType's default variables specified within the pVars object; example {'a': 1, 'b': 2} would set this type's 'a' and 'b' variables respectively
		 * @env Client | Server
		 * @param {string} pType - type to set variables for
		 * @param {object} pVars - object containing new variables and their values
		 */
		setVariables(pType: string, pVars: object): void

        /**
		 * makes the type pType inherit from the type pInherit; this change only works for newly created objects, objects already in existence will not change
		 * @env Client | Server
		 * @param {string} pType - type to add inheritance to
		 * @param {unknown} pInherit - type to inherit from
		 */
		addInheritance(pType: string, pInherit: unknown): void

        /**
		 * creates a new type called pType
		 * @env Client | Server
		 * @param {string} pType - type to create
		 */
		newType(pType: string): void

        /**
		 * returns the default value of the pName function belonging to the type pType
		 * @env Client | Server
		 * @param {string} pType - type to get function of
		 * @param {string | number} pName - name of the function to get
		 * @returns {Function} returns the default value of the pName function belonging to the type pType
		 */
		getFunction(pType: string, pName: string | number): Function

        /**
		 * returns an array of the type pType custom inheritances
		 * @env Client | Server
		 * @param {string} pType - type to get inheritances of
		 * @returns {string[]} returns an array of the type pType custom inheritances
		 */
		getInheritances(pType: string): string[]

        /**
		 * sets the pVal value of the pVar static variable belonging to the type pType; static variables are variables that belong to all Objects of this type collectively and are different than normal variables, usually static variables can only be set once, but VyScript static variables may be changed if that is what the developer wants; these variables are not inherited by child types
		 * @env Client | Server
		 * @param {string} pType - type to set static variable of
		 * @param {unknown} pVar - name of the static variable to set
		 * @param {boolean} pVal - value to give to the static variable
		 */
		setStaticVariable(pType: string, pVar: unknown, pVal: boolean): void

        /**
		 * sets the type pType's pName function to pFunc; this change only works for newly created objects, objects already in existence will not change
		 * @env Client | Server
		 * @param {string} pType - type to set function for
		 * @param {string | number} pName - string containing the name of the function
		 * @param {Function} pFunc - function
		 */
		setFunction(pType: string, pName: string | number, pFunc: Function): void

        /**
		 * returns the static variable value belonging to the type pType
		 * @env Client | Server
		 * @param {string} pType - type to get static variable of
		 * @param {unknown} pVar - name of the static variable to get
		 * @returns {unknown} returns the static variable value belonging to the type pType
		 */
		getStaticVariable(pType: string, pVar: unknown): unknown

        /**
		 * returns an array of all Object types in the game; if pParent is set, only child types of pParent are returned
		 * @env Client | Server
		 * @param {unknown} [pParent] - optional; parent type to start with
		 * @param {boolean} [pOmit] - optional; if set will not return the included path, only the children
		 * @returns {string[]} returns an array of all Object types in the game; if pParent is set, only child types of pParent are returned
		 */
		getTypes(pParent?: unknown, pOmit?: boolean): string[]

        /**
		 * removes the inheritance pInherit from the type pType; this change only works for newly created objects, objects already in existence will not change
		 * @env Client | Server
		 * @param {string} pType - type to remove inheritance from
		 * @param {unknown} pInherit - type of inheritance
		 */
		removeInheritance(pType: string, pInherit: unknown): void

        /**
		 * calls the function pFunc attached to the type pType as if the function belonged to the object pDiob using the arguments pArgs
		 * @env Client | Server
		 * @param {string} pType - type to call function of
		 * @param {Function} pFunc - name of function to call
		 * @param {Diob} pDiob - array of arguments to pass in
		 * @param {unknown[]} pArgs - calls the function pFunc attached to the type pType as if the function belonged to the object pDiob using the arguments pArgs
		 */
		callFunction(pType: string, pFunc: Function, pDiob: Diob, pArgs: unknown[]): void

        /**
		 * checks to see if pType is a valid type that exists in the game; if pType2 is defined, checks if pType is pType2 or a child of pType2
		 * @env Client | Server
		 * @param {string} pType - type to check
		 */
		isType(pType: string): boolean
                
	}
            
            
	/**The vylo type*/
	type VyloType = {
                
		/**The world object.*/
		World: World
		/**The client object.*/
		Client: Client
		/**The resource object.*/
		Resource: Resource
		/**The util object.*/
		Util: Util
		/**The event object.*/
		Event: Event
		/**The file object.*/
		File: File
		/**The icon object.*/
		Icon: Icon
		/**The map object.*/
		Map: Map
		/**The type object.*/
		Type: Type

        /**
         * The global object referencing all global variables in VyScript.
         * @env Client | Server
         */
        global: { [key: string]: unknown };

        /**
         * Loads the engine. When using loadResource before this is called, the resources will be treated as preloaded resources.
         * @env Client | Server
         * @returns {Promise<void>}
         */
        load: () => Promise<void>;

        /**
         * Deletes the Diob referenced by pDiob.
         * @env Client | Server
         * @param {Diob} pDiob - A reference to the Diob to delete.
         * @param {...unknown[]} [pArgN - Optional parameters to pass as arguments into the Diob's onDel() event function.
         * @template T - The type of additional arguments.
         * @returns {void}
         */
        delDiob: <T = unknown>(pDiob: Diob, ...pArgN: T[]) => void;

        /**
         * Creates a new Diob with the specified Object type of pType and returns it.
         * @env Client | Server
         * @param pType - A string containing the type path of the Object to be created as a Diob.
         * @param {...unknown[]} [pArgN] - optional; Parameters to pass as arguments into the Diob's onNew() event function.
         * @template T - The type of additional arguments.
         * @returns {Diob} - The newly created Diob.
         */
        newDiob: <T = unknown>(pType: string, ...pArgN: T[]) => Diob;

        /**
         * Creates a new type called pType.
         * @env Client | Server
         * @param {string} pType - Type to alter /create.
         * @param {object} [pVars] - optional; object containing variables to give the type.
         * @param {string[]} [pInherits] - optional; array of type strings to inherit.
         * @returns {void}
         */
        setType: (pType: string, pVars: object, pInherits?: string[]) => void
        
	}
        

export { VyloType, World, Diob, Movable, Particle, Tile, Region, Mob, Overlay, Sound, Interface, Client, Resource, Util, Icon, Macro, Type };