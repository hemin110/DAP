from Pearson_Func import Pearson
from ml.association_analysis.base import Aso_ana


class PrxAna(Aso_ana):

    def __init__(self):
        Aso_ana.__init__(self)
        self._name = "Pearson"
        self._model = Pearson()
