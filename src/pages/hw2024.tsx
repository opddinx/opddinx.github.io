import React from 'react';
import { Calendar, Users, FileText, ExternalLink } from 'lucide-react';
import './hw2024.css';
import Timetable from './timetable';



const presentations = [
  {
    title: "Examining Bodily Synchronization in Human-Robot Collaboration",
    members: ["○坂本 有紀 基礎工学研究科 D1", "西岡 詩歩 生命機能研究科 D1", "末光 揮一朗 基礎工研究科 M2", "橋川 莉乃 基礎工研究科 M2"],
    abstract: "Robots are becoming increasingly widespread, and opportunities for humans to engage in collaborative tasks with robots are expected to rise. In collaborative tasks between humans, it has been noted that bodily synchronization can enhance team performance. However, it is still uncertain whether the performance benefits of such bodily synchronization are also present in human-robot interactions. Therefore, this study aims to examine the impact of bodily synchronization between humans and robots on collaboration by developing robot behaviors that synchronize with users' physiological indicators. In this presentation, we discuss the current development status of the system and future perspectives.",
    pdfLink: "https://drive.google.com/file/d/1Ko9-aL7JKbFeRejDV9j5S3XYYMdlllDO/view?usp=drive_link"
  },
  {
    title: "Exploring the Mechanism of Robot Therapy for Alleviating Depression-Like Behaviors",
    members: ["○波多野 遥太 基礎工学研究科 D1", "小谷 尚輝 基礎工学研究科 D1", "谷垣 慶 情報科学研究科 D1", "西岡 詩歩 生命機能研究科 D3/5"],
    abstract: "Depression affects over 120 million people worldwide, making it a significant social issue. Although the pathophysiology of depression remains unclear, current treatments rely on pharmacotherapy and psychotherapy. In pharmacotherapy, selective serotonin reuptake inhibitors (SSRIs) and other antidepressants are commonly used, but their effectiveness is often limited. Psychotherapy primarily involves counseling, with robot therapy—interaction with robots—as one example. Despite the recognized relationship between depression and the brain, evaluations of robot therapy have mainly focused on psychological and cognitive science perspectives, leaving its effects on the brain largely unexplored. This study aims to clarify the impact of social robot therapy on the brain, with a particular focus on astrocytes, which are associated with depression.",
    pdfLink: "https://drive.google.com/file/d/1mt9FZoNHLU2hkdmQwu9P-1Etxze-gxrM/view?usp=drive_link"
  },
  {
    title: "BrainTransformer: fMRI image encoder designed for transfer to various downstream tasks",
    members: ["○淺香 智輝 基礎工学研究科 D2", "西尾 直樹 情報科学研究科 D3", "李 佰昂 情報科学研究科 D2", "藤野 美沙子 生命機能研究科 D4/5", "前田 千結 生命機能研究科 D2/5", "川畑 輝一(外部生) 生命機能研究科 D4/5"],
    abstract: "The objective of this study is to develop BrainTransformer, an functional Magnetic Resonance Imaging(fMRI) image encoder for the entire brain, designed for downstream tasks involving the decoding of brain information in response to multimodal stimuli. In this research, we plan to conduct both supervised and self-supervised learning on large-scale open-source fMRI datasets as upstream tasks. For downstream tasks, we will apply transfer learning or fine-tuning on fMRI images obtained from impression evaluation experiments involving visual and auditory stimuli. This approach aims to elucidate the process by which multimodal stimuli are transformed into emotional responses within the brain.",
    pdfLink: "https://drive.google.com/file/d/13lvDY3cjSteBIcAVAn2h6CTiuiWh3V7J/view?usp=drive_link"
  },
  {
    title: "【発表なし】A proposal for real-time communication using a sign language translation system with motion prediction.",
    members: ["○渡邉 理翔 情報科学研究科 D1", "横山 喜大 情報科学研究科 M2", "藤田 杏樹 生命機能研究科 D2/5", "前田 千結 生命機能研究科 D2/5"],
    abstract: "Deaf people are forced to use alternative communication methods such as written communication with non-signers due to the lack of a system to translate sign language, which is a substitute for speech for the deaf. In this study, we examined whether this motion prediction is valid in sign language translation using rock-paper-scissors-paper and maneuvering motion intention extraction technology as the basic technology, by performing a series of finger-writing tasks. In addition, to address the issue of non-verbal information transfer, which does not allow the transfer of emotion and degree, we interviewed deaf people and obtained statistics.",
    pdfLink: ""
  },
  {
    title: "Domain Generalization for Robot Visual Navigation Deep Learning Methods",
    members: ["○LIU Fengkai 情報科学研究科 D1", "PIAO Xihao 情報科学研究科 D1", "徐　宸飛(XU Chenfei) 基礎工学研究科 M2", "小峠 陸登 情報科学研究科 D1", "郭 婧汝(GUO Jingru) 基礎工学研究科 M1", "東口 慎吾 情報科学研究科 D1", "田村 優香 情報科学研究科 D1", "千原 直己 情報科学研究科 M2"],
    abstract: "Autonomous mobile robots are rapidly advancing and playing crucial roles in various settings such as logistics warehouses and factories. Enhancing their obstacle detection and avoidance capabilities is critical to improving their practicality. Traditional methods, including grid mapping and the Dynamic Window Approach, rely on predefined parameters, limiting their adaptability to diverse environments. Recent advancements in deep learning have enabled more sophisticated research in robot navigation within complex environments. These methods leverage sensor data and human control inputs as training data to enhance obstacle recognition and avoidance. However, the application of such models faces challenges due to the volume of training data required, which is costly to collect and sometimes impractical in privacy-sensitive environments like hospitals. This study proposes a deep learning-based visual control method to address domain generalization issues, enabling robust model training with limited data. By reducing the reliance on extensive datasets, the approach aims to enhance robots' adaptability across various scenarios. Currently, we are recording datasets to support this research, and initial experiments are underway.",
    pdfLink: "https://drive.google.com/file/d/17uwvkJTQfwSpNLHYJsIg630Az1hYXTLb/view?usp=drive_link"
  },
  {
    title: "【12th】Study on Attention and Immersion Effects in VR-Neurofeedback System",
    members: ["○Yuto Fukui", "Tatsuki Kato", "Siyuan Xiang", "Shota Nakano", "Jingru Guo"],
    abstract: "Background: Neurofeedback has been implemented as a treatment for attention enhancement. However, there remains considerable scope for optimization of feedback methodology. Purpose: In this study, we aim to improve neurofeedback efficiency by using VR goggles instead of conventional monitors commonly used for feedback. Method: We will compare and evaluate the same tasks using monitor-based feedback versus VR headset-based feedback. Progress: We have successfully measured brain waves while subjects wear VR headsets. Future Plans: We will design a system that provides real-time feedback on the acquired EEG(electroencephalography) and create questionnaires to evaluate the degree of attention",
    pdfLink: "https://drive.google.com/file/d/1koY4kQw-zMdyIY5vvfDk9ZsQ4aSwqZEX/view?usp=drive_link"
  },
  {
    title: "【12th】Development of a robot that can assist in the care of elderly people with dementia",
    members: ["○河島龍之介", "藤田杏樹", "鹿子木大河", "栢野智"],
    abstract: "近年、自ら学習・行動し人と共生するAIロボットの開発が推進されている。人と共生するロボットは、適切なコミュニケーションを取ることが求められており、その手法の探索が進められている。そこで、本研究では、嗅覚が感情に影響を与える効果に着目し、においを用いることで対話ロボットがユーザに与える印象を操作することを目指す。今回は、今後実施する実験の計画や、それにより期待される結果について発表する。",
    pdfLink: "https://drive.google.com/file/d/16VMGJ40cb50R_kFhTXN5pt069BJCAQmc/view?usp=drive_link"
  },
  {
    title: "【12th】Reproducing Adaptive Locomotion in Diverse Environments Using a Snake-Inspired Model",
    members: ["○西村樹希", "黒岩恒在", "曹漫钰"],
    abstract: "ヘビは柔軟な身体を活かして様々な環境に適応しながら移動することができるため，その動作の仕組みには大きな関心が集まっている．しかし，ヘビの環境に応じた多様な動きを再現しようとする研究はハードウェアによる制約などにより進んでいない．そこで本研究では，ヘビの身体的特性を基にした運動学的なモデルをシミュレーション上で構築する．そして，遺伝的アルゴリズムによって様々な環境に適応した動作を学習し，本来のヘビのような移動メカニズムの再現を目指す．",
    pdfLink: "https://drive.google.com/file/d/1TG7iksfDHpLLdWc7swp5IaoFxGrCOREu/view?usp=drive_link"
  }
];

const PresentationPage = () => {
  const pdfUrl = 'https://drive.google.com/file/d/1kKjl6NNNv3-rp-p8bzpyQQ967j6Cbuos/preview';
  
  return (
    <div className="min-h-screen max-w-full bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            ヒューマンウェアシンポジウム2024「社会が求める融合研究とは？」
          </h1>
          <p className="mt-2 text-gray-600">
            2024年12月6日（金）に開催されるヒューマンウェアシンポジウム2024のタイムテーブルおよびポスターの一覧です。
          </p>
          <div className="flex space-x-4 p-4">
          <a 
            href="https://docs.google.com/presentation/d/1eFiPQq-WtW3-ZngFoPjEL5WD7P3erXmRickirUF8gKE/edit?usp=sharing" 
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank" 
            rel="noopener noreferrer"
          >
            16:9のスライドテンプレート
          </a>
          <a 
            href="https://docs.google.com/presentation/d/16PnXOYZbGv-U8Os5HnlKYaCjOOdT-P6wonDXV8ib9j0/edit?usp=sharing" 
            className="text-green-600 hover:text-green-800 underline"
            target="_blank" 
            rel="noopener noreferrer"
          >
            4:3のスライドテンプレート
          </a>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSctmGJ3HV2nBnvXUEXowMc9ybRmQ3RXZ-3DCYiRO3bWAc_hgw/viewform" 
            className="text-red-600 hover:text-red-800 underline"
            target="_blank" 
            rel="noopener noreferrer"
          >
            事後アンケート
          </a>
        </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8">
      <Timetable/>
        <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">ポスター一覧</h1>
          {presentations.map((presentation, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-6"
            >
              {/* Title and Date */}
              <div className="border-b border-gray-100 pb-4 mb-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-blue-600">
                    {presentation.title}
                  </h2>
                </div>
              </div>
              
              {/* Members */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Users className="w-4 h-4 mr-2 text-gray-500" />
                  <h3 className="text-sm font-medium text-gray-500">Presenters</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {presentation.members.map((member, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              {/* Abstract */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <FileText className="w-4 h-4 mr-2 text-gray-500" />
                  <h3 className="text-sm font-medium text-gray-500">Abstract</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {presentation.abstract}
                </p>
              </div>

              {/* PDF Link */}
              <div className="flex justify-end">
                <a
                  href={presentation.pdfLink}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Presentation
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
              {/* Horizontal PDF Preview from Google Drive */}
              <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto my-6 p-4 bg-gray-200">
            <h2 className="text-xl font-semibold mb-4">Event Guide</h2>
            <div className="overflow-y-auto">
            <iframe
                src={pdfUrl}
                width="100%"    // Use full width of the container
                height="600"    // Adjust height for better visibility
                style={{ border: 'none' }}
                title="PDF Preview"
            />
            </div>
        </div>
    </div>
  );
};

export default PresentationPage;