
from ml.classification import knn, svm, bayes
from ml.association_analysis import prx 

__CLASSIFIER__ = ["Pearson", "oushi", "mashi"]


def getAssociationAnalysisByName(name):
    if name == "Pearson":
        return prx.PrxAna()
    elif name == "oushi":
        return svm.SVMClassifier()
    elif name == "mashi":
        return bayes.NBayesClassifier()

    return None


def getAssociationAnalysisNames():
    return __CLASSIFIER__
