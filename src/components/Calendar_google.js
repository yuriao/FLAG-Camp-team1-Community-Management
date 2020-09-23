import React, {Component} from 'react';

class Calendar_google extends Component {
    constructor(){
        super();
        this.state={
          CLIENT_ID = '<YOUR_CLIENT_ID>',
          API_KEY = '<YOUR_API_KEY>',
          DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          authorizeButton = document.getElementById('authorize_button'),
          signoutButton = document.getElementById('signout_button'),
        }
    }
    // the point is, we only display 7 days on page, so only need 7 arrays. for exact days info, will pass from db and will add checking codes later
    // if need props, use this.props to access

    // Client ID and API key from the Developer Console

    /**
     *  On load, called to load the auth2 library and API client library.
     */
    handleClientLoad() {
      gapi.load('client:auth2', initClient);
    }

                  /**
                   *  Initializes the API client library and sets up sign-in state
                   *  listeners.
                   */
    initClient() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
      }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
      });
    }
            
                  /**
                   *  Called when the signed in status changes, to update the UI
                   *  appropriately. After a sign-in, the API is called.
                   */
    updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listUpcomingEvents();
      } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
      }
    }
            
                  /**
                   *  Sign in the user upon button click.
                   */
    handleAuthClick(event) {
      gapi.auth2.getAuthInstance().signIn();
    }

                  /**
                   *  Sign out the user upon button click.
                   */
    handleSignoutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
    }
            
                  /**
                   * Append a pre element to the body containing the given message
                   * as its text node. Used to display the results of the API call.
                   *
                   * 
                   */
    appendPre(message) {
      var pre = document.getElementById('content');
      var textContent = document.createTextNode(message + '\n');
      pre.appendChild(textContent);
    }
            
                  /**
                   * Print the summary and start datetime/date of the next ten events in
                   * the authorized user's calendar. If no events are found an
                   * appropriate message is printed.
                   */
    listUpcomingEvents() {
      gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(function(response) {
        var events = response.result.items;
        appendPre('Upcoming events:');

        if (events.length > 0) {
          for (i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) {
              when = event.start.date;
            }
            appendPre(event.summary + ' (' + when + ')')
          }
        } else {
          appendPre('No upcoming events found.');
        }
      });
    }

    render() {
        return (
            <div>
               <p>Google Calendar API Quickstart</p>


               <button id="authorize_button" style="display: none;">Authorize</button>
               <button id="signout_button" style="display: none;">Sign Out</button>

               <pre id="content" style="white-space: pre-wrap;"></pre>
            

        
            <script type="text/javascript">

        
            </script>
        
            <script async defer src="https://apis.google.com/js/api.js"
              onload="this.onload=function(){};handleClientLoad()"
              onreadystatechange="if (this.readyState === 'complete') this.onload()">
            </script>
            </div>
        );
    }
}
    }
}


export default Calendar_google;