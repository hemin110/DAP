from ml.regression import linear, logistic , svr , randomfR , ridgereg , mlpr
from ml.regression import lasso , bayse , sgdregress, knr , gpr , dt , bg , gbr

__CATEGORY__ = ["Linear", "Logistic" , "SVR" , "RandomForestRegression",\
                "RidgeRegression","Lasso" , "Bayes" ,"SGDRegression","KNR",\
                "GPR", "Decision Trees", "Bagging" ,"GradientBoostingRegressor" ,\
                "MLPRegressor"]


def getRegressionByName(name):

    if name == "Linear":
        return linear.LinearRegression()
    elif name == "Logistic":
        return logistic.LogisticRegression()
    elif name =="SVR":
        return svr.SVRrgression()
    elif name =="RandomForestRegression":
        return randomfR.RandomForestRegression()
    elif name == "RidgeRegression":
        return ridgereg.RidgeRgression()
    elif name == "Lasso":
        return lasso.LassoRegression()
    elif name == "Bayes":
        return bayse.BayseRegress()
    elif name =="SGDRegression":
        return sgdregress.SGDRegression()
    elif name == "KNR":
        return knr.KnnRegression()
    elif name == "GPR":
        return gpr.GPRegression()
    elif name == "Decision Trees":
        return dt.DtRegression()
    elif name == "Bagging":
        return bg.BgRegression()
    elif name == "GradientBoostingRegressor":
        return gbr.GbRegression()
    elif name == "MLPRegressor":
        return mlpr.MlpRegression()

    return None


def getRegressionModels():
    return __CATEGORY__
