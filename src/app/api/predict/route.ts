import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import * as tf from '@tensorflow/tfjs-node';
import { promisify } from 'util';
import { load } from 'joblib';
import * as pickle from 'pickle';
import pandas from 'pandas-js';

// Charger les modèles au démarrage
const modelDir = path.join(process.cwd(), 'models');
const pklModelPath = path.join(modelDir, 'rf_value_prediction.pkl');
const joblibModelPath = path.join(modelDir, 'rf_model_potential.joblib');

let pklModel: { predict: (arg0: any) => any },
  joblibModel: { predict: (arg0: any) => any };

async function loadModels() {
  // Charger le modèle .pkl
  const pklBuffer = await promisify(fs.readFile)(pklModelPath);
  pklModel = pickle.loads(pklBuffer);

  // Charger le modèle .joblib
  joblibModel = await load(joblibModelPath);
}

// Charger les modèles une fois au démarrage du serveur
loadModels().catch(console.error);

export async function POST(req) {
  try {
    const body = await req.json();
    const playerData = body;

    // Convertir les données en DataFrame
    const playerDF1 = new pandas.DataFrame([playerData]);
    const playerDF2 = new pandas.DataFrame([playerData]);

    // Prédictions avec chaque modèle
    const predictedValue1 = pklModel.predict(playerDF1);
    const predictedValue2 = joblibModel.predict(playerDF2);

    return NextResponse.json({
      model_pkl_prediction: predictedValue1[0],
      model_joblib_prediction: predictedValue2[0]
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
