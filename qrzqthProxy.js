var qrzqthProxy = {

	originalCallback : null,

	lookupCall : function  (site, callsign, callback) {

		//alert('Looking up ' + callsign + ' from ' + site);

		qrzqthProxy.originalCallback = callback;

		if (sessionStorage.getItem(site + 'Key')) {
			$.ajax({
				url : '/qrzqthProxy/proxy.php?site=' + site + '&method=lookup&k=' + sessionStorage.getItem(site + 'Key') + '&call=' + callsign,

					success: function(data) {
						qrzqthProxy.normalise(data)
					}
			});
		} else {
			throw 'noLogin';
		}
	},

	login : function  (site, callback) {

		//salert('Logging in to ' + site);

		$.ajax({
				url : '/qrzqthProxy/proxy.php?site=' + site + '&method=login&u=' + userSettings[site].username + '&p=' + userSettings[site].password,

					success: function(data) {
						var xmlDoc = $.parseXML( data ),
						$xml = $( xmlDoc );

						sessionStorage.setItem(site + 'Key', $xml.find('session_id').text() + $xml.find('Key').text() )

						callback();
					}
			});
	},

	normalise : function  (data, callback) {

		var xmlDoc = $.parseXML( data ),
		$xml = $( xmlDoc );

		if ($xml.find('error').length > 0 || $xml.find('Error').length > 0) {
			console.debug ($xml.find('error'))
			console.debug ($xml.find('Error'));
			throw ($xml.find('error').text() + $xml.find('Error').text());
		};

		var normalisedData = {
			callsign: '',
			name: '',
			locator: '',
			image: ''
		};
										// QRZ.com format			// HamQTH Format
		normalisedData.callsign = $xml.find('call').text() + $xml.find('callsign').text();
								// we want first and last name
		normalisedData.name = ($xml.find('fname').text() + ' ' + $xml.find(' name').text() + $xml.find('adr_name').text()).trim();
		// they agree on this one!
		normalisedData.locator = $xml.find('grid').text();
		// last but not least
		normalisedData.image = $xml.find('image').text() + $xml.find('picture').text();

		qrzqthProxy.originalCallback(normalisedData);
	},

};