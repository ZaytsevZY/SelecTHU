"use client"; // 标记为客户端组件

import { useRouter } from "next/navigation";

export default function V1Page() {
  const router = useRouter();

  // 点击“返回”按钮时返回主界面
  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-3xl font-semibold text-green-700 mb-4">v1介绍</h1>
      <p className="text-lg text-green-600 mb-8">
        这里是v1版本的详细介绍内容。您可以在这里添加任何您想展示的信息。
      </p>
      <button
        onClick={handleBackClick}
        className="px-4 py-2 bg-green-200 rounded hover:bg-green-300 transition"
      >
        返回
      </button>
    </div>
  );
}