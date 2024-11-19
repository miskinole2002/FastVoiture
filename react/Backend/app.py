from langchain_ollama import OllamaLLM 
from langchain_core.output_parsers import StrOutputParser
from operator import itemgetter
from docx import Document
from langchain_community.document_loaders import Docx2txtLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_ollama.embeddings import OllamaEmbeddings
from sklearn.metrics.pairwise import cosine_similarity
from langchain_community.vectorstores import * 
from langchain_core.runnables import RunnableParallel,RunnablePassthrough
from pydantic import ValidationError

def Bot(question:str):
        print(f"la question est:{question}")
        model= OllamaLLM(model="llama3.2",temperature=0.0) # temperature=0 ou 1 veut dire qu'il est deterministe


        # on extrait la reponse 
        # strOUtputParser permet de faire le tostring d'un objet 
        parser=StrOutputParser() # pemet de convertir en string 
        chain= model | parser

        # 3- template
        from langchain.prompts import ChatPromptTemplate
        # on dire au model comment il doit repondre
        template= """
        Answer the question based on the context below. if you can't answer the question , reply "Mes excuses, mais je n'ai aucune idée".env
        Context:{context}

        Question:{question} 
        """  
        prompt= ChatPromptTemplate.from_template(template)
        mycontext ="le mari de Stella est ton papy  "
        Myquestion= "qui est le mari de Stella ?"
        prompt.format(context=mycontext,question=Myquestion)

        # ajout du contexte  dans le prompt
        chain= prompt | model |parser
        t=chain.invoke({
            "context": mycontext,
            "question": Myquestion

        })

        # concatenation 
        path=r'C:\Users\MCS\OneDrive\Bureau\session6\documentation technique\FastVoiture\react\Backend\test2.docx'


        loader= Docx2txtLoader(path)

        text=loader.load()


        # utilisation de tous les textes comme contexte

        t=chain.invoke({
            "context":text,
            "question":"qui est Sadeu Fotsing William Junior ?"
        })


        #split text

        text_splitter= RecursiveCharacterTextSplitter(chunk_size=100,chunk_overlap=20)
        document =text_splitter.split_documents(text)

        # generation des embeddings

        embeddings=OllamaEmbeddings(model="llama3.2")
        query=embeddings.embed_query("qui est le mari de Stella ?")

        context1= embeddings.embed_query("le mari de stella est ton papy")
        context2= embeddings.embed_query("william aime mis") 

        # distance de cosine 
        query_similarity1= cosine_similarity([query],[context1])[0][0]
        query_similarity2= cosine_similarity([query],[context2])[0][0]

        # print(query_similarity1)
        # print(query_similarity2)

        # creation de la base de signature 

        vectostore1= DocArrayInMemorySearch.from_documents( document,embedding=embeddings)
        vectostore2= DocArrayInMemorySearch.from_texts( [
                
        "pour creer un compte  dans notre application fast voiture, il faut avoir un vehicule ,un permis de conduire valide  ",
        " si vous avez besoin d'aide contactez le numero suivant +6132777092",
        " pour commencer a gagner de l'argent vous devez  creer un compte",
        "pour recevoir de l'argent vous devriez avoir un compte paypal ",
        " pour tous probleme de payement utiliser le formulaire web ",
        " je suis Audrey 3.0 j'ai ete creer par 4 supers devellopeurs Blondine,Precieux,Junior,Dr William",
        "mon but est d'apporter mon aide aux utilisateurs de FastVoiture"
        "William est un developpeur junior polyvalent  super intelligent,courageux,tres drole ,qui reflechir a 800 idees par seconde ",
        "william peut parfois manquer de serieux mais c'est ce qui le differencie des autres,il est si aimable"
        "Brithney est la futur femme de William , elle est super timide,mais dans le fond elle est une bonne personne quia beaucoup d'qmour a donner " 

        ],embedding=embeddings)

        vectostore3= DocArrayInMemorySearch.from_texts( [
                
        "pour creer un compte  dans notre application fast voiture, il faut avoir un vehicule ,un permis de conduire valide  ",
        "pour recevoir des paiements , les conducteurs peuvent enregistrer leurs cartes ou leur compte stripe pour receptionner le paiement"
        " si vous avez besoin d'aide contactez le numero suivant +6132777092",
        " pour commencer a gagner de l'argent vous devez  creer un compte avec tous vos informations valide ",
        "pour recevoir de l'argent vous devriez avoir un compte paypal ",
        " pour tous problemes de payement utiliser le formulaire web ",
        " je suis Audrey 3.0 j'ai ete creer par 4 supers devellopeurs Blondine,Precieux,Junior,Dr William",
        "mon but est d'apporter mon aide aux utilisateurs de FastVoiture"
        " les conducteurs recoivent 70% du prix de la course "
        " si un client oublie un objet dans la voiture le conducteur se doit de signaler le poste de controle de l'application via le numero indique"
        "les  notes des clients sur les chauffeurs est inscrit dans la page activite de l'application"
        "pour plus de questions Contacter le 6132777092"
        "en cas d'urgence ou d'agression contactez le 911"
        " le travail est organise de tel sorte a ce que les chauffeur sont libres de travailler quand ils veulent sans obligation"
        " la version de Fast 1.0.0 ne marche pour lk'instant qu'au quebec mais prevoit s'etendre "
        

        ],embedding=embeddings)
        q="comment se connecter a l'application  ?"
        x=vectostore3.similarity_search_with_score(query=q,k=4)


        # on va  utiliser retriever

        chunks_retriever= vectostore3.as_retriever()
        chunks_retriever.invoke(" que dois je faire en cas de probleme ?")


        ### 

        setup=RunnableParallel(context=chunks_retriever,question=RunnablePassthrough())
        


        chain=setup | prompt | model |parser
        
        x=chain.invoke(question)
        print(x)
        return x
