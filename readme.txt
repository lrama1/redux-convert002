


    
XSS Testers
\"/><script>alert('test');</script>


Using the wizard UI (http://vadimg.com/twitter-bootstrap-wizard-example/) or
(https://github.com/VinceG/twitter-bootstrap-wizard)

1.  Create a div like the following:
<div id="rootwizard">
    <div class="navbar">
        <div class="navbar-inner">
            <div class="container">
                <ul>
                    <li><a href="#tab1" data-toggle="tab">First</a></li>
                    <li><a href="#tab2" data-toggle="tab">Second</a></li>
                    <li><a href="#tab3" data-toggle="tab">Third</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="tab-content">
        <div class="tab-pane" id="tab1">
            1
        </div>
        <div class="tab-pane" id="tab2">
            2
        </div>
        <div class="tab-pane" id="tab3">
            3
        </div>
        <ul class="pager wizard">
            <li class="previous first" style="display:none;"><a href="#">First</a></li>
            <li class="previous"><a href="#">Previous</a></li>
            <li class="next last" style="display:none;"><a href="#">Last</a></li>
            <li class="next"><a href="#">Next</a></li>
        </ul>
    </div>
</div>

2.  Activate the wizard

$('#rootwizard').bootstrapWizard({
	'onNext': function(tab, navigation, index) {
		alert('next tab');
	}
});

---------------------
Inspecting the generated Web Service
1.  http://localhost:8080/<webcontext>/webservices
		- this should list out the available endpoints on your browser
2.  use SOAPUI to test the available services

