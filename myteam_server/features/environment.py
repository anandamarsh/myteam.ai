from behave import fixture, use_fixture
from django.test.runner import DiscoverRunner
from django.test.testcases import LiveServerTestCase
from django.core.management import call_command
import requests

@fixture
def django_test_runner(context):
    context.test_runner = DiscoverRunner()
    context.test_runner.setup_test_environment()
    context.old_db_config = context.test_runner.setup_databases()
    yield
    context.test_runner.teardown_databases(context.old_db_config)
    context.test_runner.teardown_test_environment()

@fixture
def django_test_case(context):
    context.test_case = LiveServerTestCase
    context.test_case.setUpClass()
    yield
    context.test_case.tearDownClass()
    del context.test_case

def before_all(context):
    context.config.setup_logging()
    # Base URL for our API
    context.base_url = 'http://localhost:8000'

def before_scenario(context, scenario):
    pass

def after_scenario(context, scenario):
    pass

def after_all(context):
    pass
