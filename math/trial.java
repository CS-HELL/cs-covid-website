
import java.util.ArrayList;
import java.util.Scanner;
import java.util.ArrayList;


public class trial{
    private toEquation probSolver = new toEquation();
    
    private double lower = 0;
    private double upper = 0;
    private String eq = "";

    public trial(){

    }
    public static void main(String[] args) {
        trial trial = new trial();
        trial.run();
    }

    public void run(){
        Scanner scan = new Scanner(System.in);
        menu();
        System.out.println("What do you want to solve?\n1.Trapezoidal rule\n2.Multiple Application of Trapizoidal rule");
        System.out.println("3.Simpson 1/3 Rule\n4.Multiple Application of Simpson 1/3 Rule\n5.Simpson 3/8 Rule");
        int input = scan.nextInt();
        switch (input) {
            case 1:
                System.out.println("Approximate I is: "+solveTrapRule(lower, upper, eq));
                break;

            case 2:
                System.out.println("Please Input n");
                int n = scan.nextInt();
                System.out.println("Approximate I is: "+solveMultipleRule(lower, upper, eq, n));

                break;
            case 3: 
                System.out.println("Approximate I is: "+solveSimpThirdRule(lower, upper, eq));

                break;
            case 4:
                System.out.println("Please Input n");
                n = scan.nextInt();
                System.out.println("Approximate I is: "+solveMultipleSTR(lower, upper, eq, n));
                break;
            case 5:
                System.out.println("Approximate I is: "+solveSimpEigthRule(lower, upper, eq));
                break;
        }
    }

    public void menu(){
        Scanner scan = new Scanner(System.in);
        Scanner scan2 = new Scanner(System.in);

        System.out.println("Please input lower Limit");
        double lower = scan.nextDouble();
        this.lower = lower;
        System.out.println("Please input upper limit");
        double upper = scan.nextDouble();
        this.upper=upper;
        System.out.println("Please input equation");
        String eq = scan2.nextLine();
        this.eq=eq;
    }

    private double solveTrapRule(double lower,double upper,String eq){
        String fx0 = probSolver.toEq(eq, lower);
        String fx1 = probSolver.toEq(eq, upper);

        double res1 = toEquation.eval(fx0);
        double res2 = toEquation.eval(fx1);
        return ((upper-lower)/2)*(res1+res2);
    }

    private double solveMultipleRule(double lower, double upper, String eq,int n){
        ArrayList<Double> list = new ArrayList<Double>();
        double h = (upper-lower)/n;
        list = solveFx(lower, upper, h);
        double sum =0;
        for(int i = 1; i<n;i++){
            sum += list.get(i);
        }
        System.out.println(sum);
        return (h/2)*(list.get(0)+(2*sum)+list.get(n));
    }

    private double solveSimpThirdRule(double lower, double upper, String eq){
        ArrayList<Double> list = new ArrayList<Double>();
        double h = (upper-lower)/2;
        list = solveFx(lower, upper, h);
        return (h/3)*(list.get(0)+(4*list.get(1))+list.get(2));
    }

    private double solveMultipleSTR(double lower, double upper, String eq,int n){
        ArrayList<Double> list = new ArrayList<Double>();
        double h = (upper-lower)/n;
        list = solveFx(lower, upper, h);
        double evenSum =0;
        double oddSum =0;
        for(int i=1;i<n;i++){
            if(isEven(list.get(i))){
                evenSum += list.get(i);
            }
            else{
                oddSum += list.get(i);
            }
        }
       
        return (((upper-lower)/(3*n))*(list.get(0)+4*oddSum+2*evenSum+list.get(n)));
    }

    private double solveSimpEigthRule(double lower, double upper, String eq){
        ArrayList<Double> list = new ArrayList<Double>();
        double h = (upper-lower)/3;
        list = solveFx(lower, upper, h);
        return (((3*h)/8)*(list.get(0)+3*list.get(1)+3*list.get(2)+list.get(3)));
    }
    private ArrayList<Double> solveFx(double lower,double upper,double h){
        ArrayList<Double> list = new ArrayList<Double>();
        for(double i=lower;i<=upper;i+=h){
            String fx = probSolver.toEq(eq, i);
            double res = toEquation.eval(fx);
            System.out.println(i+" "+res);
            list.add(res);
        }
        return list;
    }
    private boolean isEven(double x){
        return (x%2)==0;
    }
}