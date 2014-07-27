# QRZ.com & HamQTH API Proxy

Neither QRZ.com nor HamQTH provide an API which can be accessed directly from the web browser (CORS), this is a very simple PHP scrip to proxy some basic API requests to both sites.

Now with basic jQuery functions!

## How to use

Very simple, shove the php file somewhere, then call it like so:

	proxy.php?site=qrz&method=login&u=username&p=password

	proxy.php?site=qth&method=lookup&k=accessKey&call=callsign

	qrzqthProxy.login('qth', callback);

	qrzqthProxy.lookupCall('qrz','callsign',callback);