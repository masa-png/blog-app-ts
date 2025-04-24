import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post } from "../types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // APIでpostsを取得する処理をuseEffectで実行
  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
      );
      const { posts } = await res.json();
      setPosts(posts);
      setLoading(false);
    };

    fetcher();
  }, []);

  if (loading) return <p>読み込み中...</p>;

  if (!loading && posts.length === 0) return <p>投稿がみつかりませんでした</p>;

  return (
    <div>
      <div className="max-w-3xl mx-auto my-10 px-4">
        <ul>
          {/* ブログの記事をループして表示 */}
          {posts.map((post: Post) => {
            return (
              <li key={post.id} className="flex flex-col list-none m-0 p-0">
                <Link to={`posts/${post.id}`} className="block bg-white">
                  <div className="border border-gray-300 mb-8 py-4 pl-4 pr-8">
                    <div>
                      <div className="flex justify-between">
                        <div className="text-gray-400 text-xs">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex flex-wrap">
                          {post.categories.map(
                            (category: string, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className="px-1.5 py-1 mr-2 text-xs text-blue-600 border border-blue-600 rounded"
                                >
                                  {category}
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                      <p className="text-[#333] text-2xl mb-4 mt-2">
                        {post.title}
                      </p>
                      <div
                        dangerouslySetInnerHTML={{ __html: post.content }}
                        className="text-[#333] text-base leading-normal line-clamp-2"
                      ></div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
