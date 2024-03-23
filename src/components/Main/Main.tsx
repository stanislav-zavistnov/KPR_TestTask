import { useRef, useEffect, useState } from 'react';
import { Setup } from '../Setup/Setup';


export interface Ball {
    x: number;
    y: number;
    dx: number;
    dy: number;
    friction: number;
    color: string;
    radius: number;
}

export function Main() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const balls = useRef<Ball[]>([]);
    const [showSetup, setShowSetup] = useState(false);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [currentBall, setCurrentBall] = useState<Ball>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let requestId: number;

        function drawBall(ball: Ball) {
            if (!ctx) return;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = ball.color;
            ctx.fill();
            ctx.closePath();
        }

        function updateBallPosition(ball: Ball) {
            if (!canvas) return;
            ball.x += ball.dx;
            ball.y += ball.dy;
            ball.dx *= ball.friction;
            ball.dy *= ball.friction;

            if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
                ball.dx = -ball.dx;
            }
            if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
                ball.dy = -ball.dy;
            }
        }

        function handleBallCollision(ball1: Ball, ball2: Ball) {
            const dx = ball2.x - ball1.x;
            const dy = ball2.y - ball1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = ball1.radius + ball2.radius;

            if (distance < minDistance) {
                const overlap = minDistance - distance;
                const normalX = dx / distance;
                const normalY = dy / distance;

                ball1.x -= overlap * normalX * 0.5;
                ball1.y -= overlap * normalY * 0.5;
                ball2.x += overlap * normalX * 0.5;
                ball2.y += overlap * normalY * 0.5;

                const dP1 = (ball2.dx - ball1.dx) * normalX + (ball2.dy - ball1.dy) * normalY;

                ball1.dx += dP1 * normalX;
                ball1.dy += dP1 * normalY;
                ball2.dx -= dP1 * normalX;
                ball2.dy -= dP1 * normalY;
            }
        }

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            balls.current.forEach(ball => {
                updateBallPosition(ball);
                drawBall(ball);
            });

            handleBallCollision(balls.current[0], balls.current[1]);
            handleBallCollision(balls.current[0], balls.current[2]);
            handleBallCollision(balls.current[1], balls.current[2]);

            requestId = requestAnimationFrame(animate);
        }

        const handleClick = (event: MouseEvent) => {
            if (!canvas) return;
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;
            setClickPosition({ x: mouseX, y: mouseY });

            // Red
            const distanceToRedBall = Math.sqrt((mouseX - balls.current[0].x) ** 2 + (mouseY - balls.current[0].y) ** 2);
            if (distanceToRedBall < balls.current[0].radius) {
                console.log('Вы кликнули по красному шарику');
                setShowSetup(true);
                setCurrentBall(balls.current[0]);
                return;
            }

            //Blue
            const distanceToBlueBall = Math.sqrt((mouseX - balls.current[1].x) ** 2 + (mouseY - balls.current[1].y) ** 2);
            if (distanceToBlueBall < balls.current[1].radius) {
                setCurrentBall(balls.current[1]);
                setShowSetup(true);
                return;
            }

            //White
            const distanceToWhiteBall = Math.sqrt((mouseX - balls.current[2].x) ** 2 + (mouseY - balls.current[2].y) ** 2);
            if (distanceToWhiteBall < balls.current[2].radius) {
                console.log('Вы кликнули по белому шарику');
                balls.current[2].dx = (balls.current[2].x - mouseX) / 5;
                balls.current[2].dy = (balls.current[2].y - mouseY) / 5;
                balls.current[2]
                setShowSetup(false);
                return;
            }

            setShowSetup(false);
            setCurrentBall(undefined);
        };

        canvas.addEventListener('click', handleClick);

        balls.current = [
            {
                x: canvas.width / 4,
                y: canvas.height / 2,
                dx: 0,
                dy: 0,
                friction: 0.98,
                color: 'red',
                radius: 70,
            },
            {
                x: (3 * canvas.width) / 4,
                y: canvas.height / 2,
                dx: 0,
                dy: 0,
                friction: 0.98,
                color: 'blue',
                radius: 30,
            },
            {
                x: canvas.width / 2,
                y: canvas.height / 2,
                dx: 0,
                dy: 0,
                friction: 0.98,
                color: 'white',
                radius: 50,
            }
        ];

        animate();

        return () => {
            cancelAnimationFrame(requestId);
            canvas.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <>
            <canvas 
            ref={canvasRef} 
            width={800} 
            height={600} 
            style={{ backgroundColor: 'green', border: '1px solid black', marginRight: '20px' }} />
            {showSetup && <Setup position={clickPosition} currentBall={currentBall}/>}
        </>
    );
}
