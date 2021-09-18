from azure.ai.textanalytics import TextAnalyticsClient, ExtractSummaryAction
from azure.core.credentials import AzureKeyCredential
from dotenv import load_dotenv
import os


class Sentence:
    def __init__(self, text, startTime, endTime):
        self.text = text
        self.startTime = startTime
        self.endTime = endTime


class Analysis:
    def __init__(self, documents):
        load_dotenv()
        key = os.getenv("AZURE_KEY")
        endpoint = os.getenv("AZURE_ENDPOINT")

        client = authenticate_client(key, endpoint)
        self.keyPhrases = extract_key_phrases(documents, client)
        self.entities = entity_linking(documents, client)
        self.summaries = text_summarization(documents, client)


def analyse_transcript(sentences, key, endpoint):
    completed_analses = []
    outputDocuments = []
    currentText = ""
    for sentence in sentences:
        if len(outputDocuments) == 5:
            completed_analses.append(Analysis(outputDocuments))
            outputDocuments.clear()
        if len(currentText + line) > 5000:
            outputDocuments.append(currentText)
            currentText = sentence.text
        else:
            currentText = currentText + sentence.text
    outputDocuments.append(currentText)
    completed_analses.append(Analysis(outputDocuments))


def authenticate_client(key, endpoint):
    ta_credential = AzureKeyCredential(key)
    text_analytics_client = TextAnalyticsClient(
        endpoint=endpoint,
        credential=ta_credential)
    return text_analytics_client


def text_summarization(documents, client):
    poller = client.begin_analyze_actions(
        documents, actions=[ExtractSummaryAction(MaxSentenceCount=10)])
    results = poller.result()
    for result in results:
        extract_summary_result = result[0]
        if extract_summary_result.is_error:
            print("...Is an error with code '{}' and message '{}'".format(
                extract_summary_result.code, extract_summary_result.message))
            return extract_summary_result.message
        else:
            summary = "".join(
                [sentence.text for sentence in extract_summary_result.sentences])
            return summary
    return results


def entity_linking(documents, client):
    try:
        response = client.recognize_linked_entities(documents)[0]
        return response.entities
    except Exception as err:
        print("Encountered exception: {}".format(err))


def extract_key_phrases(documents, client):
    try:
        response = client.extract_key_phrases(documents)[0]
        if not response.is_error:
            return response.key_phrases
        else:
            print(response.id, response.error)
            return response.error
    except Exception as err:
        print("Encountered exception: {}".format(err))


with open("message.txt") as file:
    completed_analses = []
    outputDocuments = []
    currentText = ""
    for line in file.readlines():
        if len(outputDocuments) == 5:
            completed_analses.append(Analysis(outputDocuments))
            outputDocuments.clear()
        if len(currentText + line) > 5000:
            outputDocuments.append(currentText)
            currentText = line
        else:
            currentText = currentText + line
    outputDocuments.append(currentText)
    completed_analses.append(outputDocuments)
