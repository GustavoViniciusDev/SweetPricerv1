import { Star, Heart, Repeat2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card";

interface EvaluationCardProps {
    name: string;
    username: string;
    content: string;
    rating: number;
    likes: number;
    shares: number;
}

export default function Component() {
    return (
        <div className="container flex flex-col items-center min-h-screen px-4 md:px-6">
            <div className="text-center space-y-6 mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-custom-700 dark:text-dark-custom-200">
                    <b>
                        O favorito de diversos usuários em todo o Brasil.
                    </b>
                </h1>
                <p className="text-custom-600 dark:text-dark-custom-300 mb-8">
                    Veja o que alguns de nossos clientes disseram sobre o nosso sistema.
                </p>
            </div>

            <div className="w-full max-w-md space-y-4">
                <EvaluationCard
                    name="Confeitaria Gigi Cakes"
                    username="@confeitaria.gigi.cakes"
                    content="O SweetPricer foi um dos melhores investimentos que fiz para minha confeitaria. Vem me ajudando muito a precificar meus doces e a manter tudo salvo em um só lugar."
                    rating={5}
                    likes={42}
                    shares={12}
                />
                <EvaluationCard
                    name="Sweet Rosa Confeitaria"
                    username="@sweetrosaconfeitaria"
                    content="Desde que comecei a usar o SweetPricer, a gestão dos custos na minha confeitaria ficou muito mais fácil. Consigo precificar meus produtos com mais precisão e centralizar todas as informações em um único lugar."
                    rating={5}
                    likes={28}
                    shares={5}
                />
                <EvaluationCard
                    name="Confeitaria Bel Fiore"
                    username="@confeitariabelfi"
                    content="O SweetPricer transformou a forma como gerencio minha confeitaria. Agora, precificar meus doces é uma tarefa rápida e eficiente, e ainda tenho a tranquilidade de saber que todos os dados estão seguros em um só lugar."
                    rating={5}
                    likes={15}
                    shares={2}
                />
            </div>
        </div>
    );
}

function EvaluationCard({
    name,
    username,
    content,
    rating,
    likes,
}: EvaluationCardProps) {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>

                    <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-sm text-custom-500">{username}</p>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm">{content}</p>
                <div className="mt-2 flex">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-custom-300"
                                }`}
                        />
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-custom-500">
                <div className="flex gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {likes}
                    </Button>
                </div>

            </CardFooter>
        </Card>
    );
}
