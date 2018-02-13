These are links and some information about using Amazon DynamoDB for multiple platforms.
https://aws.amazon.com/dynamodb/developer-resources/

**************************************************************************************
For use with Android:
**************************************************************************************
API:
https://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/

Developer Guide:
https://docs.aws.amazon.com/aws-mobile/latest/developerguide/getting-started.html

/*
Add awsconfiguration.json to your app.
From your download location, place awsconfiguration.json into 
a res/raw Android Resource Directory in your Android project.

Your AndroidManifest.xml must contain:
	<uses-permission android:name="android.permission.INTERNET"/>
	<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>

Add dependencies to your app/build.gradle. These libraries enable basic AWS functions, 
like credentials, and analytics.
	dependencies {
	    compile ('com.amazonaws:aws-android-sdk-mobile-client:2.6.7@aar') 
	    { transitive = true; }
	}

Add the following code to the onCreate method of your main or startup activity. 
This will establish a connection with AWS Mobile. AWSMobileClient is a singleton 
that will be an interface for your AWS services.
	import com.amazonaws.mobile.client.AWSMobileClient;

	  public class YourMainActivity extends Activity {
	    @Override
	    protected void onCreate(Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);

	        AWSMobileClient.getInstance().initialize(this).execute();
	     }
	  }

-Add Analytics
-Add User Sign-in
-Add Push Notification
-Add NoSQL Database
-Add User Data Storage
-Add Cloud logic
-Add Messaging
-Add Conversational Bots
*/

**************************************************************************************

**************************************************************************************
For use with JavaScript:
**************************************************************************************
API:
https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html

Developer Guide:
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/welcome.html

/*
Common Use Cases
Using the SDK for JavaScript in browser scripts makes it possible to realize a number 
of compelling use cases. Here are several ideas for things you can build in a browser 
application using the SDK for JavaScript to access different web services.

-Using Amazon Cognito Identity to enable authenticated user access to your browser 
applications and websites, including use of third-party authentication from 
Facebook and others.

-Using Amazon DynamoDB for serverless data persistence such as individual user 
preferences for visitors of your website or application users.
*/

**************************************************************************************

**************************************************************************************
For use with Java:
**************************************************************************************
API:
https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/index.html

Developer Guide:
https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/welcome.html

GitHub:
https://github.com/aws/aws-sdk-java#features

/*
Features:

-Amazon DynamoDB Object Mapper - Uses Plain Old Java Object (POJOs) to 
store and retrieve Amazon DynamoDB data.

-Amazon S3 Transfer Manager - With a simple API, achieve enhanced the throughput, 
performance, and reliability by using multi-threaded Amazon S3 multipart calls.

-Amazon SQS Client-Side Buffering - Collect and send SQS requests in 
asynchronous batches, improving application and network performance.
*/
