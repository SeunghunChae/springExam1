import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.deeplearning4j.nn.weights.WeightInit;
import org.deeplearning4j.optimize.listeners.ScoreIterationListener;
import org.nd4j.linalg.activations.Activation;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.dataset.DataSet;
import org.nd4j.linalg.factory.Nd4j;
import org.nd4j.linalg.learning.config.Adam;
import org.nd4j.linalg.lossfunctions.LossFunctions;
import org.deeplearning4j.nn.conf.NeuralNetConfiguration;
import org.deeplearning4j.nn.conf.layers.DenseLayer;
import org.deeplearning4j.nn.conf.layers.OutputLayer;

import java.util.ArrayList;
import java.util.List;

public class StockPricePrediction {
    public static void main(String[] args) {
        int numInputs = 1;
        int numOutputs = 1;
        int numHiddenNodes = 20;
        int numSamples = 1000;
        double learningRate = 0.01;
        int nEpochs = 100;

        MultiLayerNetwork model = new MultiLayerNetwork(new NeuralNetConfiguration.Builder()
                .weightInit(WeightInit.XAVIER)
                .updater(new Adam(learningRate))
                .list()
                .layer(0, new DenseLayer.Builder().nIn(numInputs).nOut(numHiddenNodes)
                        .activation(Activation.TANH).build())
                .layer(1, new OutputLayer.Builder(LossFunctions.LossFunction.MSE)
                        .activation(Activation.IDENTITY).nIn(numHiddenNodes).nOut(numOutputs).build())
                .build());

        model.init();
        model.setListeners(new ScoreIterationListener(100));

        // Generate input data
        List<INDArray> inputList = new ArrayList<>();
        List<INDArray> labelList = new ArrayList<>();
        for (int i = 0; i < numSamples; i++) {
            inputList.add(Nd4j.create(new double[]{i}));
            labelList.add(Nd4j.create(new double[]{Math.sin(i * 0.1)}));
        }
        DataSet data = new DataSet(Nd4j.vstack(inputList), Nd4j.vstack(labelList));

        // Train the model
        for (int i = 0; i < nEpochs; i++) {
            model.fit(data);
        }

        // Make predictions
        INDArray input = Nd4j.create(new double[]{numSamples});
        INDArray prediction = model.output(input, false);
        System.out.println("Prediction for sample " + numSamples + ": " + prediction.getDouble(0
