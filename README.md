# good morning!
this is a good morning giphy service that will send a good morning giphy to where ever you configure it to under the meltwater workspace

Currently no drone build. to build and deploy run the commands manually(these commands can be found in the drone file)

```
sam package --template-file template.yml --s3-bucket good-morning-stogie --output-template-file packaged.yaml

sam deploy --template-file /Users/chelseykrol/repos/GoodMorning/packaged.yaml --region=eu-west-1 --stack-name good-morning-stogie --capabilities CAPABILITY_IAM --parameter-overrides BucketName=good-morning-stogie SecretsLastUpdated="2022-11-09T08:13:11.999000-05:00" --tags MWBilling_CoE=PRSolutions MWBilling_Department=422 MWBilling_Team=stogie
```