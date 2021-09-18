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
    def __init__(self, sentences):
        # Load client environement variables and authenticate the client
        load_dotenv()
        key = os.getenv("AZURE_KEY")
        endpoint = os.getenv("AZURE_ENDPOINT")
        client = authenticate_client(key, endpoint)

        # setup before converting sentences to Azure document structure
        output_documents = []
        current_document = ""

        self.sentences = sentences

        for sentence in sentences:
            # Azure requires that each document be under 5120 charecters
            if len(current_document + sentence.text) > 5000:
                # add the completed document to the list of documents to process
                output_documents.append(current_document)
                current_document = sentence.text  # reset current document
            else:
                current_document = current_document + sentence.text
        output_documents.append(current_document)

        self.key_phrases = []
        self.entities = []
        self.summary = ""

        # loop through each set of 5 documents as Azure only allows 5 documents per batch
        for i in range(0, int(len(output_documents)/5)):
            # Get a slice of the documents array from 0..5, 5..10
            documents_to_analyze = output_documents[i*5:(i+5)]

            # append relevent processed data from Azure
            self.key_phrases.append(extract_key_phrases(
                documents_to_analyze, client))
            self.entities.append(entity_linking(documents_to_analyze, client))
            self.summary = self.summary + "\n" + text_summarization(
                documents_to_analyze, client)


def authenticate_client(key, endpoint):
    ta_credential = AzureKeyCredential(key)
    text_analytics_client = TextAnalyticsClient(
        endpoint=endpoint,
        credential=ta_credential)
    return text_analytics_client


def text_summarization(documents, client):
    # Sets up object which till tell azure what actions to perform on the inputted documents
    poller = client.begin_analyze_actions(
        documents, actions=[ExtractSummaryAction(MaxSentenceCount=10)])

    # retrieve results of actions
    results = poller.result()

    summary = ""
    for result in results:
        # grab the results of the only action in the results object
        summary_result = result[0]
        if not summary_result.is_error:
            # saves the summary into a string then returns the string
            for sentence in summary_result.sentences:
                summary = summary + " " + sentence.text
        else:
            # print error code and return
            print(summary_result.code, summary_result.message)
            return summary_result.message
    return summary


def entity_linking(documents, client):
    try:
        # return entities from Azure
        return client.recognize_linked_entities(
            documents)[0].entities
    except Exception as err:
        # print error and return
        print("Encountered exception: {}".format(err))
        return err


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
    sentences = map(lambda text: Sentence(text, 0, 0), file.readlines())
    analysis = Analysis(sentences)
    print(analysis.entities)